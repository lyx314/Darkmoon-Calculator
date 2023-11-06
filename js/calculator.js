"use strict";

import { BigNumber } from "./bignumber.js-9.1.1/bignumber.mjs";

export class Calculator {
    numbers = [];

    constructor(material) {
        material.numbers.forEach((num) =>
            this.numbers.push(new BigNumber(num))
        );
    }

    calcWeight(arr) {
        let weight = BigNumber(arr[0]);
        weight = weight.plus(BigNumber(arr[1]).multipliedBy(3));
        weight = weight.plus(BigNumber(arr[2]).multipliedBy(9));
        return weight;
    }

    get percent() {
        const totalWeight = 9999 * (1 + 3 + 9);
        const result = this.calcWeight(this.numbers).dividedBy(totalWeight);
        return Number(result.multipliedBy(100).toFixed(2));
    }
}
