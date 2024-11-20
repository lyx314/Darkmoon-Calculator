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

  get isWorldLevel9() {
    return this.data.isWorldLevel9;
  }

  set isWorldLevel9(value) {
    this.data.isWorldLevel9 = Boolean(value);
    this.saveData();
  }

  get currentID() {
    return this.data.currentID;
  }

  set currentID(id) {
    if (this.data.currentID === id) {
      return;
    }
    console.log("Switch current ID to", id);
    this.data.currentID = id;
    this.saveData();
  }

  get currentMaterial() {
    return this.materials.find(item => item.id === this.data.currentID);
  }

  get colorTheme() {
    return this.data.colorTheme ?? "cyan";
  }

  set colorTheme(theme) {
    this.data.colorTheme = theme;
    this.saveData();
  }

  getNumbers(id = this.currentID) {
    const index = this.data.materialsNumbers.findIndex(item => item.id === id);
    if (index === -1) {
      return [0, 0, 0];
    } else {
      return this.data.materialsNumbers[index].numbers;
    }
  }

  setNumbers(numbers) {
    const index = this.data.materialsNumbers.findIndex(
      item => item.id === this.currentID,
    );
    if (index === -1) {
      // no record, create new one
      const record = {
        id: this.currentID,
        numbers: numbers,
        lock: null,
      };
      this.data.materialsNumbers.push(record);
    } else {
      // record exists, update numbers
      this.data.materialsNumbers[index].numbers = numbers;
    }
    this.saveData();
  }

  getLockNumbers() {
    const index = this.data.materialsNumbers.findIndex(
      item => item.id === this.currentID,
    );
    if (index === -1) {
      return null;
    } else {
      return this.data.materialsNumbers[index].lock;
    }
  }

  lockNumbers() {
    const index = this.data.materialsNumbers.findIndex(
      item => item.id === this.currentID,
    );
    if (index === -1) {
      const record = {
        id: this.currentID,
        numbers: [0, 0, 0],
        lock: [0, 0, 0],
      };
      this.data.materialsNumbers.push(record);
    } else {
      this.data.materialsNumbers[index].lock = [
        ...this.data.materialsNumbers[index].numbers,
      ];
    }
    this.saveData();
  }

  unlockNumbers() {
    const index = this.data.materialsNumbers.findIndex(
      item => item.id === this.currentID,
    );
    this.data.materialsNumbers[index].lock = null;
    this.saveData();
  }

  /**
   * Get materials' names by ID.
   * @param {Number} id material's ID. Take current ID as default.
   * @returns {String[]}
   */
  getNames(id = this.currentID) {
    const material = this.materials.find(item => item.id === id);
    return material.names;
  }

  get enemiesConfig() {
    const index = this.data.enemiesConfig.findIndex(
      item => item.id === this.currentID,
    );
    return index === -1 ? [] : this.data.enemiesConfig[index].config;
  }

  set enemiesConfig(config) {
    const record = {
      id: this.currentID,
      config: config,
    };
    const index = this.data.enemiesConfig.findIndex(
      item => item.id === this.currentID,
    );
    if (index === -1) {
      this.data.enemiesConfig.push(record);
    } else {
      this.data.enemiesConfig[index] = record;
    }
    this.saveData();
  }

  get enemyOptions() {
    return this.currentMaterial.enemies.map(item => item.name);
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

  sortMaterialsByID(desc) {
    if (desc) {
      this.materials.sort((a, b) => b.id - a.id);
      this.materials = this.materials
        .filter(item => item.type === "common")
        .concat(this.materials.filter(item => item.type === "elite"));
    } else {
      this.materials.sort((a, b) => a.id - b.id);
      this.materials = this.materials
        .filter(item => item.type === "elite")
        .concat(this.materials.filter(item => item.type === "common"));
    }
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
    this.materials.forEach(item => {
      const record = {
        id: item.id,
        numbers: item.keys.map(key => data[key] ?? 0),
      };
      this.data.materialsNumbers.push(record);
    });
    this.saveData();
  }
}
