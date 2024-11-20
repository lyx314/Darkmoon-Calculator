"use strict";

import { BigNumber } from "./bignumber.mjs";

export class Calculator {
  constructor(numbers) {
    this.numbersHold = [...numbers];
    this.reset();
  }

  reset() {
    this.numbers = this.numbersHold.map(num => BigNumber(num));
    this.leftRunTimes = 0;
    this.craftCount = [0, 0];
  }

  setEnemies(enemiesData, enemiesConfig, isWorldLevel9 = true) {
    this.enemiesData = enemiesData;
    this.materialsPerRun = [0, 0, 0];
    enemiesConfig.forEach(config => {
      if (config.activated) {
        let materialsPerEnemy = enemiesData.find(
          enemy => enemy.name === config.name,
        ).materialsPerEnemy;
        let coeff = Calculator.enemyLevelCoeff(config.level);
        if (isWorldLevel9) {
          coeff = config.level === 20 ? coeff * 1.5 : coeff * 1.25;
        }
        // coeff = isWorldLevel9 ? coeff * 1.5 : coeff;
        materialsPerEnemy = materialsPerEnemy.map(num =>
          BigNumber(num).multipliedBy(coeff).multipliedBy(config.number),
        );
        this.materialsPerRun = this.materialsPerRun.map((num, i) =>
          BigNumber(num).plus(materialsPerEnemy[i]),
        );
      }
    });
    this.materialsPerRun = this.materialsPerRun.map(num => {
      if (+num >= 0) {
        return +num.toFixed(4);
      } else {
        return 0;
      }
    });
  }

  setInitNumbers(numbers) {
    this.initNumbers = [...numbers];
  }

  increasement() {
    if (!this.initNumbers) {
      return "-";
    }
    const diff = this.numbersHold.map((num, i) => num - this.initNumbers[i]);
    const diffWeight = Calculator.weight(...diff);
    const oneRunWeight = Calculator.weight(...this.materialsPerRun);
    if (oneRunWeight) {
      return +BigNumber(diffWeight).dividedBy(oneRunWeight).toFixed(1);
    } else {
      return "-";
    }
  }

  static enemyLevelCoeff(level) {
    if (level >= 18) {
      return 1;
    } else {
      return (level + 12) / 30;
    }
  }

  completed() {
    return this.numbers.every(num => +num >= 9999);
  }

  addToNumbers(arr) {
    this.numbers = this.numbers.map((num, i) => num.plus(arr[i]));
  }

  validCraft = index =>
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
      (a, b) => b.materialsPerEnemy[0] - a.materialsPerEnemy[0],
    );
    // this.enemiesData.sort(
    //     (a, b) => a.materialsPerEnemy[0] - b.materialsPerEnemy[0]
    // );
    this.materialsPerRun = this.enemiesData[0].materialsPerEnemy.map(num =>
      BigNumber(num),
    );
    this.calculateRun(sucrose, dori);
    return this.numbers.map(num => +num.minus(9999).toFixed(1));
  }

  static weight = (low, medium, high) => low + medium * 3 + high * 9;

  static progress(low, medium, high, d = 2) {
    const weight = this.weight(low, medium, high);
    const total = this.weight(9999, 9999, 9999);
    return +BigNumber(weight).dividedBy(total).multipliedBy(100).toFixed(d);
  }

  static isValidNumber = x => Number.isInteger(x) && x >= 0 && x <= 9999;
}
