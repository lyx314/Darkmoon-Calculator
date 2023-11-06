"use strict";

import json from "./data.json" assert { type: "json" };

 class DataManager {
    data = [];
    currentId = 1;
    options = {};

    constructor() {
        const cachedData = localStorage.getItem("data");
        if (!cachedData) {
            this.initData();
        } else {
            this.data = JSON.parse(cachedData);
        }

        const cachedId = localStorage.getItem("currentId");
        this.currentId = cachedId ? Number(cachedId) : 1;

        this.saveData();
        this.saveId();
    }

    initData() {
        json.forEach((item) => {
            item.numbers = [0, 0, 0];
            item.percent = 0;
            this.data.push(item);
        });
    }

    get currentMaterial() {
        return this.getMaterial(this.currentId);
    }

    getMaterial(id) {
        return this.data.find((item) => item.id === id);
    }

    switchTo(id) {
        this.currentId = id;
        this.saveId();
        console.log("Current id: " + this.currentId);
    }

    sort(key, desc = false) {
        if (desc) {
            this.data.sort((a, b) => b[key] - a[key]);
        } else {
            this.data.sort((a, b) => a[key] - b[key]);
        }
    }

    saveData() {
        localStorage.setItem("data", JSON.stringify(this.data));
    }

    saveId() {
        localStorage.setItem("currentId", this.currentId);
    }

    clear() {
        localStorage.removeItem("data");
        localStorage.removeItem("currentId");
    }
}

export const dataManager = new DataManager();