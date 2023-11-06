"use strict";

import json from "./data.json" assert { type: "json" };

export class DataManager {
    data = [];
    currentId = 1;
    options = {};

    constructor() {
        const cachedData = localStorage.getItem("data");
        if (!cachedData) {
            this.#initData();
        } else {
            this.data = JSON.parse(cachedData);
        }

        const cachedId = localStorage.getItem("currentId");
        this.currentId = cachedId ? +cachedId : 1;

        this.saveData();
        this.saveId();
    }

    #initData() {
        json.forEach(item => {
            item.numbers = [0, 0, 0];
            item.percent = 0;
            this.data.push(item);
        });
    }

    getMaterial = (id = this.currentId) => {
        const material = this.data.find(item => item.id === id);
        console.log(material);
        return material;
    };

    switchTo(id) {
        if (id === this.currentId) {
            return;
        }

        this.currentId = id;
        this.saveId();

        console.log("Switch to id: " + this.currentId);
        this.getMaterial();
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
