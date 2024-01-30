"use strict";

import { Calculator } from "./calculator.js";
import userDefault from "./data/userDefault.json" assert { type: "json" };
import materials from "./data/materials.json" assert { type: "json" };
import enemyLevelRanges from "./data/enemyLevelRanges.json" assert { type: "json" };

export class DataManager {
    constructor() {
        this.materials = materials;
        this.enemyLevelRanges = enemyLevelRanges;
        const cachedData = localStorage.getItem("data");
        this.data = cachedData ? JSON.parse(cachedData) : userDefault;
    }

    get currentID() {
        return this.data.currentID;
    }

    set currentID(id) {
        this.data.currentID = id;
        this.saveData();
    }

    get currentMaterial() {
        return this.materials.find((item) => item.id === this.data.currentID);
    }

    getNumbers(id = this.currentID) {
        const index = this.data.materialsNumbers.findIndex(
            (item) => item.id === id
        );
        return index === -1
            ? [0, 0, 0]
            : this.data.materialsNumbers[index].numbers;
    }

    setNumbers(numbers) {
        const record = {
            id: this.currentID,
            numbers: numbers,
        };
        const index = this.data.materialsNumbers.findIndex(
            (item) => item.id === this.currentID
        );
        if (index === -1) {
            this.data.materialsNumbers.push(record);
        } else {
            this.data.materialsNumbers[index] = record;
        }
        this.saveData();
    }

    getNames(id = this.currentID) {
        return this.materials.find((item) => item.id === id).names;
    }

    get enemiesConfig() {
        const index = this.data.enemiesConfig.findIndex(
            (item) => item.id === this.currentID
        );
        return index === -1 ? [] : this.data.enemiesConfig[index].config;
    }

    set enemiesConfig(config) {
        const record = {
            id: this.currentID,
            config: config,
        };
        const index = this.data.enemiesConfig.findIndex(
            (item) => item.id === this.currentID
        );
        if (index === -1) {
            this.data.enemiesConfig.push(record);
        } else {
            this.data.enemiesConfig[index] = record;
        }
        this.saveData();
    }

    get enemyOptions() {
        return this.currentMaterial.enemies.map((item) => item.name);
    }

    get listOptions() {
        return this.data.listOptions;
    }

    set listOptions(options) {
        this.data.listOptions = options;
        this.saveData();
    }

    get craftOptions() {
        return this.data.craftOptions;
    }

    set craftOptions(options) {
        this.data.craftOptions = options;
        this.saveData();
    }

    /**
     * 将材料按ID排序。
     * @param {boolean} desc
     */
    sortMaterialsByID(desc) {
        this.materials.sort((a, b) => (desc ? b.id - a.id : a.id - b.id));
    }

    /**
     * 将材料按进度排序。
     * @param {boolean} desc
     */
    sortMaterialsByProgress(desc) {
        this.materials.sort((a, b) => {
            const pa = Calculator.progress(...this.getNumbers(a.id));
            const pb = Calculator.progress(...this.getNumbers(b.id));
            return desc ? pb - pa : pa - pb;
        });
    }

    get enemies() {
        const material = this.materials.find(
            (item) => item.id === this.data.currentID
        );
        return material.enemies;
    }

    saveData() {
        localStorage.setItem("data", JSON.stringify(this.data));
    }

    clearData() {
        localStorage.clear();
    }
}
