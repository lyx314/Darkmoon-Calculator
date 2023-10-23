"use strict";

export class Calculator {
    constructor(item) {
        this.initNumbers = item.numbers;
        this.numbers = [0, 0, 0];
        this.resetNumbers();
        this.enemies = item.enemies;
        this.dropPerRun = [0, 0, 0];
        this.setDropPerRun();
        this.outOfMax = [0, 0, 0];
        this.max = 9999;
        this.craftCounters = [0, 0];
        this.enemyCounter = 0;
        this.runCounter = 0;
    }

    resetNumbers() {
        for (let i = 0; i < 3; i++) {
            this.numbers[i] = Number(this.initNumbers[i]);
        }
    }

    resetCounters() {
        this.craftCounters = [0, 0];
        this.enemyCounter = 0;
        this.runCounter = 0;
    }

    setEnemies(enemies) {
        this.enemies = enemies;
        this.setDropPerRun();
    }

    setDropPerRun() {
        this.dropPerRun = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            for (let enemy of this.enemies) {
                if (enemy.enemiesPerRun >= 1) {
                    this.dropPerRun[i] += enemy.enemiesPerRun * enemy.drop[i];
                }
            }
        }
    }

    getDropPerRun(fix) {
        return `
        每车材料：
        高阶 (${this.dropPerRun[2].toFixed(fix)}) +
        中阶 (${this.dropPerRun[1].toFixed(fix)}) +
        低阶 (${this.dropPerRun[0].toFixed(fix)})`;
    }

    completed() {
        for (let n of this.numbers) {
            if (n < this.max) {
                return false;
            }
        }
        return true;
    }

    // 低阶合成中阶
    craftMedium(sucroseBonus = false, doriBonus = false) {
        this.craftCounters[0] += 1;
        this.numbers[0] -= 3;
        this.numbers[1] += 1;
        if (sucroseBonus) {
            this.numbers[1] += 0.1;
        }
        if (doriBonus) {
            this.numbers[0] += 0.25;
        }
    }

    // 中阶合成高阶
    craftHight(sucroseBonus = false, doriBonus = false) {
        this.craftCounters[1] += 1;
        this.numbers[1] -= 3;
        this.numbers[2] += 1;
        if (sucroseBonus) {
            this.numbers[2] += 0.1;
        }
        if (doriBonus) {
            this.numbers[1] += 0.25;
        }
    }

    craft(sucroseBonus = false, doriBonus = false) {
        if (sucroseBonus === true && doriBonus === true) {
            throw new Error();
        }
        while (
            this.numbers[0] > this.numbers[1] &&
            this.numbers[1] < this.max
        ) {
            this.craftMedium(sucroseBonus, doriBonus);
            while (
                this.numbers[1] > this.numbers[2] &&
                this.numbers[2] < this.max
            ) {
                this.craftHight(sucroseBonus, doriBonus);
            }
        }
        while (
            this.numbers[1] > this.numbers[2] &&
            this.numbers[2] < this.max
        ) {
            this.craftHight(sucroseBonus, doriBonus);
            while (
                this.numbers[0] > this.numbers[1] &&
                this.numbers[1] < this.max
            ) {
                this.craftMedium(sucroseBonus, doriBonus);
            }
        }
    }

    addOneEnemy(drop) {
        this.enemyCounter += 1;
        for (let i = 0; i < 3; i++) {
            this.numbers[i] += drop[i];
        }
    }

    addOneRun() {
        this.runCounter += 1;
        for (let i = 0; i < 3; i++) {
            this.numbers[i] += this.dropPerRun[i];
        }
    }

    calculateEnemies(sucroseBonus = false, doriBonus = false) {
        for (let enemy of this.enemies) {
            this.resetNumbers();
            this.resetCounters();
            while (!this.completed()) {
                this.addOneEnemy(enemy.drop);
                this.craft(sucroseBonus, doriBonus);
            }
            enemy.count = this.enemyCounter;
        }
        for (let i = 0; i < 3; i++) {
            this.outOfMax[i] = (this.numbers[i] - this.max).toFixed();
        }
        return this.enemies;
    }

    calculateRuntimes(sucroseBonus = false, doriBonus = false) {
        if (this.dropPerRun[0] === 0) {
            return "";
        }
        this.resetNumbers();
        this.resetCounters();
        while (!this.completed()) {
            this.addOneRun();
            this.craft(sucroseBonus, doriBonus);
        }
        for (let i = 0; i < 3; i++) {
            this.outOfMax[i] = this.numbers[i] - this.max;
        }
        const diff = this.weight(this.outOfMax) / this.weight(this.dropPerRun);
        return (this.runCounter - diff).toFixed(1);
    }

    progress() {
        this.resetNumbers();
        return this.weight(this.numbers) / ((1 + 3 + 9) * this.max);
    }

    weight(arr) {
        return arr[0] + arr[1] * 3 + arr[2] * 9;
    }
}
