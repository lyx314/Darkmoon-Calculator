"use strict";

export class Calculator {
    constructor(item) {
        this.initNumbers = item.numbers;
        this.numbers = item.numbers;
        this.enemies = item.enemies;
        this.dropPerEnemy = [0, 0, 0];
        this.dropPerRun = [0, 0, 0];
        this.getDropPerRun();
        this.outOfMax = [0, 0, 0];
        this.max = 9999;
        this.craftCounters = [0, 0];
        this.enemyCounter = 0;
    }

    resetCounters() {
        this.craftCounters = [0, 0];
        this.enemyCounter = 0;
    }

    setNumber(low, medium, high) {
        this.numbers = [low, medium, high];
    }

    setEnemies(enemies) {
        this.enemies = enemies;
        this.getDropPerRun();
    }

    getDropPerRun() {
        for (let i = 0; i < 3; i++) {
            for (let enemy of this.enemies) {
                if (enemy.enemiesPerRun > 0) {
                    this.dropPerRun[i] +=
                        enemy.enemiesPerRun * enemy.drop[i];
                }
            }
        }
    }

    setEnemyDrop(low, medium, high) {
        this.dropPerEnemy = [low, medium, high];
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

    addOne() {
        this.enemyCounter += 1;
        for (let i = 0; i < this.numbers.length; i++) {
            this.numbers[i] += this.dropPerEnemy[i];
        }
    }

    calculate(bonus = true) {
        this.numbers = [...this.initNumbers];
        this.resetCounters();
        while (!this.completed()) {
            this.addOne();
            this.craft(bonus);
        }
        this.getOutOfMax();
    }

    getOutOfMax() {
        if (this.completed()) {
            for (let i = 0; i < 3; i++) {
                const out = this.numbers[i] - this.max;
                this.outOfMax[i] =
                    out > this.dropPerEnemy[i] ? out.toFixed(1) : 0;
            }
        }
    }

    progress() {
        return (
            this.weight(this.numbers) /
            this.weight([this.max, this.max, this.max])
        );
    }

    weight(arr) {
        return arr[0] + arr[1] * 3 + arr[2] * 9;
    }
}
