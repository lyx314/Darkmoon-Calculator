"use strict";

import { Calculator } from "./calculator.js";
import { userDefault } from "./data/userDefault.js";
import { materials } from "./data/materials.js";
import { enemyLevelRanges } from "./data/enemyLevelRanges.js";

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

    get colorTheme() {
        return this.data.colorTheme ?? "cyan";
    }

    set colorTheme(theme) {
        this.data.colorTheme = theme;
        this.saveData();
    }

    getNumbers(id = this.currentID) {
        const index = this.data.materialsNumbers.findIndex(
            (item) => item.id === id
        );
        if (index === -1) {
            return [0, 0, 0];
        } else {
            return this.data.materialsNumbers[index].numbers;
        }
    }

    /**
     * Add or update numbers of current material.
     * @param {Number[]} numbers
     */
    setNumbers(numbers) {
        const index = this.data.materialsNumbers.findIndex(
            (item) => item.id === this.currentID
        );
        if (index === -1) {
            // no record, create new one
            const record = {
                id: this.currentID,
                numbers: numbers,
            };
            this.data.materialsNumbers.push(record);
        } else {
            // record exists, update numbers
            this.data.materialsNumbers[index].numbers = numbers;
        }
        this.saveData();
    }

    /**
     * Get materials' names by ID.
     * @param {Number} id material's ID. Take current ID as default.
     * @returns {String[]}
     */
    getNames(id = this.currentID) {
        const material = this.materials.find((item) => item.id === id);
        return material.names;
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
     * Sort materials by id.
     * @param {boolean} desc if true, sort in descending order; if false, sort in ascending order
     */
    sortMaterialsByID(desc) {
        this.materials.sort((a, b) => (desc ? b.id - a.id : a.id - b.id));
    }

    /**
     * Sort materials by progress.
     * @param {boolean} desc if true, sort in descending order; if false, sort in ascending order
     */
    sortMaterialsByProgress(desc) {
        this.materials.sort((a, b) => {
            const pa = Calculator.progress(...this.getNumbers(a.id));
            const pb = Calculator.progress(...this.getNumbers(b.id));
            return desc ? pb - pa : pa - pb;
        });
    }

    get enemies() {
        return this.currentMaterial.enemies;
    }

    /**
     * Save data.
     */
    saveData() {
        localStorage.setItem("data", JSON.stringify(this.data));
        console.log("Data saved.");
    }

    /**
     * Clear data.
     */
    clearData() {
        localStorage.removeItem("data");
        console.log("Data cleared.");
    }

    /**
     * Import data in GOOD format.
     * @param {*} data
     */
    import(data) {
        this.data.materialsNumbers = [];
        this.materials.forEach((item) => {
            const record = {
                id: item.id,
                numbers: item.keys.map((key) => data[key] ?? 0),
            };
            this.data.materialsNumbers.push(record);
        });
        this.saveData();
    }
}
