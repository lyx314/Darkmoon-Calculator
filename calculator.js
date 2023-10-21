"use strict";

export class Calculator {
    constructor(item) {
        this.initNumbers = item.numbers;
        this.numbers = [0, 0, 0];
        this.resetNumbers();
        this.enemies = item.enemies;
        this.dropPerRun = [0, 0, 0];
        this.getDropPerRun();
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
        this.getDropPerRun();
    }

    getDropPerRun() {
        this.dropPerRun = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            for (let enemy of this.enemies) {
                if (enemy.enemiesPerRun >= 1) {
                    this.dropPerRun[i] += enemy.enemiesPerRun * enemy.drop[i];
                }
            }
        }
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
    craft01(bonus = true) {
        this.craftCounters[0] += 1;
        this.numbers[0] -= 3;
        this.numbers[1] += 1;
        if (bonus) {
            this.numbers[1] += 0.1;
        }
    }

    // 中阶合成高阶
    craft12(bonus = true) {
        this.craftCounters[1] += 1;
        this.numbers[1] -= 3;
        this.numbers[2] += 1;
        if (bonus) {
            this.numbers[2] += 0.1;
        }
    }

    craft(bonus = true) {
        while (
            this.numbers[0] > this.numbers[1] &&
            this.numbers[1] < this.max
        ) {
            this.craft01(bonus);
            while (
                this.numbers[1] > this.numbers[2] &&
                this.numbers[2] < this.max
            ) {
                this.craft12(bonus);
            }
        }
        while (
            this.numbers[1] > this.numbers[2] &&
            this.numbers[2] < this.max
        ) {
            this.craft12(bonus);
            while (
                this.numbers[0] > this.numbers[1] &&
                this.numbers[1] < this.max
            ) {
                this.craft01(bonus);
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

    calculateEnemies(bonus = true) {
        for (let enemy of this.enemies) {
            this.resetNumbers();
            this.resetCounters();
            while (!this.completed()) {
                this.addOneEnemy(enemy.drop);
                this.craft(bonus);
            }
            enemy.count = this.enemyCounter;
        }
        return this.enemies;
    }

    calculateRuntimes(bonus = true) {
        if (this.dropPerRun[0] === 0) {
            return "";
        }
        this.resetNumbers();
        this.resetCounters();
        while (!this.completed()) {
            this.addOneRun();
            this.craft(bonus);
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
