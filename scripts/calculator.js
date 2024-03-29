"use strict";

import { BigNumber } from "./bignumber.mjs";

export class Calculator {
    constructor(numbers) {
        this.numbersCopy = numbers;
        this.reset();
    }

    reset() {
        this.numbers = this.numbersCopy.map((num) => BigNumber(num));
        this.leftRunTimes = 0;
        this.craftCount = [0, 0];
    }

    setEnemies(enemiesData, enemiesConfig) {
        this.enemiesData = enemiesData;
        this.materialsPerRun = [0, 0, 0];
        enemiesConfig.forEach((config) => {
            if (config.activated) {
                let materialsPerEnemy = enemiesData.find(
                    (enemy) => enemy.name === config.name
                ).materialsPerEnemy;
                const coeff = Calculator.enemyLevelCoeff(config.level);
                materialsPerEnemy = materialsPerEnemy.map((num) =>
                    BigNumber(num)
                        .multipliedBy(coeff)
                        .multipliedBy(config.number)
                );
                this.materialsPerRun = this.materialsPerRun.map((num, i) =>
                    BigNumber(num).plus(materialsPerEnemy[i])
                );
            }
        });
    }

    static enemyLevelCoeff = (level) => (level + 12) / 30;

    completed() {
        return this.numbers.every((num) => +num >= 9999);
    }

    addToNumbers(arr) {
        this.numbers = this.numbers.map((num, i) => num.plus(arr[i]));
    }

    validCraft = (index) =>
        +this.numbers[index] > +this.numbers[index + 1] &&
        +this.numbers[index] >= 3 &&
        +this.numbers[index + 1] < 9999;

    craft(rank, sucrose, dori) {
        this.craftCount[rank] += 1;
        this.numbers[rank] = this.numbers[rank].minus(3);
        this.numbers[rank + 1] = this.numbers[rank + 1].plus(1);
        if (sucrose) {
            this.numbers[rank + 1] = this.numbers[rank + 1].plus(0.1);
        }
        if (dori) {
            this.numbers[rank] = this.numbers[rank].plus(0.25);
        }
    }

    trim(sucrose, dori) {
        const rank = {
            medium: 0,
            high: 1,
        };
        while (this.validCraft(rank.medium)) {
            this.craft(rank.medium, sucrose, dori);
            while (this.validCraft(rank.high)) {
                this.craft(rank.high, sucrose, dori);
            }
        }
        while (this.validCraft(rank.high)) {
            this.craft(rank.high, sucrose, dori);
            while (this.validCraft(rank.medium)) {
                this.craft(rank.medium, sucrose, dori);
            }
        }
    }

    calculateRun(sucrose, dori) {
        if (+this.materialsPerRun[0] === 0) {
            this.leftRunTimes = "-";
            return;
        }
        this.reset();
        this.trim(sucrose, dori);
        while (!this.completed()) {
            this.addToNumbers(this.materialsPerRun);
            this.leftRunTimes += 1;
            this.trim(sucrose, dori);
        }
    }

    overflow(sucrose, dori) {
        this.enemiesData.sort(
            (a, b) => a.materialsPerEnemy[0] - b.materialsPerEnemy[0]
        );
        this.materialsPerRun = this.enemiesData[0].materialsPerEnemy.map(
            (num) => BigNumber(num)
        );
        this.calculateRun(sucrose, dori);
        return this.numbers.map((num) => +num.minus(9999).toFixed(1));
    }

    /**
     * 计算材料毕业进度。
     * @param {number} low 低阶材料数量
     * @param {number} medium 中阶材料数量
     * @param {number} high 高阶材料数量
     * @param {number} fix 小数位数
     * @returns
     */
    static progress(low, medium, high, fix = 2) {
        const weight = low + medium * 3 + high * 9;
        const total = 9999 * (1 + 3 + 9);
        const p = BigNumber(weight).dividedBy(total).multipliedBy(100);
        return +p.toFixed(fix);
    }

    static isValidNumber(n) {
        return Number.isInteger(n) && n >= 0 && n <= 9999;
    }
}
