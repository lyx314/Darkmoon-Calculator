"use strict";

export class Calculator {
    constructor(low, medium, high) {
        this.numbers = [low, medium, high];
        this.drop = [0, 0, 0];
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

    setEnemy(low, medium, high) {
        this.drop = [low, medium, high];
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
            this.numbers[i] += this.drop[i];
        }
    }

    calculate(bonus = true) {
        const initNumbers = [...this.numbers];
        this.resetCounters();
        this.craft(bonus);
        while (!this.completed()) {
            this.addOne();
            this.craft(bonus);
        }
        for (let i = 0; i < 3; i++) {
            const out = this.numbers[i] - this.max;
            this.outOfMax[i] = out > this.drop[i] ? out.toFixed(1) : 0;
        }
        this.numbers = initNumbers;
    }

    progress() {
        const [low, medium, high] = this.numbers;
        return (low + medium * 3 + high * 9) / (this.max * (1 + 3 + 9));
    }
}
