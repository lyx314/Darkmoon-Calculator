"use strict";

import { BigNumber } from "./bignumber.mjs";

export class Calculator {
    #material;
    #numbers; // array of 3 BigNumbers
    #craftCount;
    #enemyCount;
    #MAX = 9999;

    constructor(material) {
        this.#material = material;
        this.#reset();
    }

    #reset() {
        this.#craftCount = [0, 0];
        this.#enemyCount = 0;
        this.#numbers = this.#material.numbers.map((num) => BigNumber(num));
    }

    #completed() {
        for (const num of this.#numbers) {
            if (num.isLessThan(this.#MAX)) return false;
        }
        return true;
    }

    #addMaterials(materials) {
        this.#numbers = this.#numbers.map((num, i) => num.plus(materials[i]));
    }

    #validCraft = (index) =>
        this.#numbers[index].isGreaterThan(this.#numbers[index + 1]) &&
        this.#numbers[index].isGreaterThanOrEqualTo(3) &&
        this.#numbers[index + 1].isLessThan(this.#MAX);

    #craft(index, sucross, dori) {
        this.#craftCount[index] += 1;
        this.#numbers[index].minus(3);
        this.#numbers[index + 1].plus(1);
        if (sucross) {
            this.#numbers[index + 1].plus(0.1);
        }
        if (dori) {
            this.#numbers[index].plus(0.25);
        }
    }

    calculate(materialsPerEnemy, sucross = false, dori = false) {
        this.#reset();
        while (!this.#completed()) {
            this.#enemyCount + 1;
            this.#addMaterials(materialsPerEnemy);
            while (this.#validCraft(0)) {
                this.#craft(0, sucross, dori);
                while (this.#validCraft(1)) {
                    this.#craft(1, sucross, dori);
                }
            }
            while (this.#validCraft(1)) {
                this.#craft(1, sucross, dori);
                while (this.#validCraft(0)) {
                    this.#craft(0, sucross, dori);
                }
            }
        }
    }

    percent = (fix = 2) =>
        +this.#weight(...this.#material.numbers)
            .dividedBy(this.#MAX * (1 + 3 + 9))
            .multipliedBy(100)
            .toFixed(fix);

    #weight = (low, medium, high) =>
        BigNumber(low)
            .plus(BigNumber(medium).multipliedBy(3))
            .plus(BigNumber(high).multipliedBy(9));
}
