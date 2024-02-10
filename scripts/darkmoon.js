"use strict";

import { Calculator } from "./calculator.js";
import { DataManager } from "./dataManager.js";

export class Darkmoon {
    constructor() {
        this.dm = new DataManager();

        this.clearData = document.querySelector(".clear-data");
        this.importData = document.querySelector(".import-data");

        this.materialNumbers = [
            ...document.querySelectorAll(".material-input"),
        ].reverse();
        this.materialNames = [
            ...document.querySelectorAll(".material-name"),
        ].reverse();
        this.materialImages = [
            ...document.querySelectorAll(".material-img"),
        ].reverse();
        this.addBtns = [...document.querySelectorAll(".add-btn")].reverse();
        this.minusBtns = [...document.querySelectorAll(".minus-btn")].reverse();
        this.lastBtn = document.querySelector(".last-material");
        this.nextBtn = document.querySelector(".next-material");

        this.enemies = document.querySelector(".enemies");
        this.addEnemyBtn = document.querySelector(".add-enemy-btn");

        this.leftRunTimes = document.querySelector(".left-run-times");
        this.progressPerRun = document.querySelector(".progress-per-run");
        this.materialsPerRun = document.querySelector(".materials-per-run");

        this.sucroseBonus = document.getElementById("sucrose-bonus");
        this.doriBonus = document.getElementById("dori-bonus");
        this.noneBonus = document.getElementById("none-bonus");

        this.craftMediumComplete = document.querySelector(
            ".craft-medium-complete"
        );
        this.craftMediumEven = document.querySelector(".craft-medium-even");
        this.craftMediumOverflow = document.querySelector(
            ".craft-medium-overflow"
        );

        this.craftHighComplete = document.querySelector(".craft-high-complete");
        this.craftHighEven = document.querySelector(".craft-high-even");
        this.craftHighOverflow = document.querySelector(".craft-high-overflow");

        this.craftMediumBtn = document.querySelector(".craft-medium-btn");
        this.craftHighBtn = document.querySelector(".craft-high-btn");

        this.craftAttention = document.querySelector(".overflow-attention");

        // list
        this.list = document.querySelector(".list");
        this.listSortProgress = document.getElementById("list-sort-progress");
        this.listSortID = document.getElementById("list-sort-id");
        this.listOrderAscending = document.getElementById(
            "list-order-asecnding"
        );
        this.listOrderDescending = document.getElementById(
            "list-order-desecnding"
        );
        this.listHideCompleted = document.getElementById("hide-completed");
    }

    start() {
        console.log("Start Darkmoon.");
        this.init();
        this.updateAll();
    }

    updateAll() {
        this.displayMaterial();
        this.diaplayEnemies();
        this.displayCraft();
        this.displayStatistics();
        this.displayList();
    }

    init() {
        this.clearData.addEventListener("click", () => {
            const input = confirm("确定要清除所有数据吗？");
            if (input) {
                this.dm.clearData();
                window.location.reload();
            }
        });

        this.importData.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".json";
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = (readerEvent) => {
                    const data = JSON.parse(readerEvent.target.result);
                    if (data.format === "GOOD") {
                        this.dm.importData(data.materials);
                        this.updateAll();
                    }
                };
            };
            input.click();
        });

        this.materialNumbers.forEach((input) =>
            input.addEventListener("change", () => {
                if (!Calculator.isValidNumber(+input.value)) {
                    input.value = "";
                }
                this.inputNumbers();
            })
        );

        this.addBtns.forEach((btn, index) =>
            btn.addEventListener("click", () => {
                const num = +this.materialNumbers[index].value + 1;
                if (Calculator.isValidNumber(num)) {
                    this.materialNumbers[index].value = num;
                    this.inputNumbers();
                }
            })
        );

        this.minusBtns.forEach((btn, index) =>
            btn.addEventListener("click", () => {
                const num = +this.materialNumbers[index].value - 1;
                if (Calculator.isValidNumber(num)) {
                    this.materialNumbers[index].value = num;
                    this.inputNumbers();
                }
            })
        );

        this.lastBtn.addEventListener("click", () => {
            const id = this.dm.currentID;
            this.dm.currentID = id > 1 ? id - 1 : this.dm.materials.length;
            this.updateAll();
        });

        this.nextBtn.addEventListener("click", () => {
            const id = this.dm.currentID;
            this.dm.currentID = id < this.dm.materials.length ? id + 1 : 1;
            this.updateAll();
        });

        this.addEnemyBtn.addEventListener("click", () => {
            this.addEnemy({
                name: "",
                level: 18,
                number: 0,
                activated: true,
            });
            this.inputEnemiesConfig();
            this.diaplayEnemies();
        });

        [
            this.listSortID,
            this.listSortProgress,
            this.listOrderAscending,
            this.listOrderDescending,
            this.listHideCompleted,
        ].forEach((input) =>
            input.addEventListener("change", () => {
                this.dm.listOptions = this.listOptions;
                this.displayList();
            })
        );

        [this.sucroseBonus, this.doriBonus, this.noneBonus].forEach((input) => {
            input.addEventListener("change", () => {
                this.dm.craftOptions = this.craftOptions;
                this.displayCraft();
                this.displayStatistics();
            });
        });

        this.craftMediumBtn.addEventListener("click", () => {
            let input = prompt(
                "请输入合成中阶的数量。如果使用砂糖或多莉合成产生了额外的材料，请用空格分隔。例如：1000 100"
            );
            input = input.trim().split(/\s+/);
            const numbers = this.dm.getNumbers();
            let medium = numbers[1] + +input[0];
            let low = numbers[0] - +input[0] * 3;
            if (input.length > 1) {
                if (this.sucroseBonus.checked) {
                    medium += +input[1];
                }
                if (this.doriBonus.checked) {
                    low += +input[1];
                }
            }
            if (
                !Calculator.isValidNumber(medium) ||
                !Calculator.isValidNumber(low)
            ) {
                alert("Invalid input!");
                return;
            }
            this.materialNumbers[1].value = medium;
            this.materialNumbers[0].value = low;
            this.inputNumbers();
        });

        this.craftHighBtn.addEventListener("click", () => {
            let input = prompt(
                "请输入合成高阶的数量。如果使用砂糖或多莉合成产生了额外的材料，请用空格分隔。例如：1000 100"
            );
            input = input.trim().split(/\s+/);
            const numbers = this.dm.getNumbers();
            let high = numbers[2] + +input[0];
            let medium = numbers[1] - +input[0] * 3;
            if (input.length > 1) {
                if (this.sucroseBonus.checked) {
                    high += +input[1];
                }
                if (this.doriBonus.checked) {
                    medium += +input[1];
                }
            }
            if (
                !Calculator.isValidNumber(high) ||
                !Calculator.isValidNumber(medium)
            ) {
                alert("Invalid input!");
                return;
            }
            this.materialNumbers[2].value = high;
            this.materialNumbers[1].value = medium;
            this.inputNumbers();
        });
    }

    inputNumbers() {
        const numbers = this.materialNumbers.map((input) => +input.value);
        this.dm.setNumbers(numbers);
        this.setProgress(numbers);

        this.displayCraft();
        this.displayStatistics();
        this.displayList();
    }

    setProgress(numbers) {
        const progress = Calculator.progress(...numbers, 2) + "%";
        document.querySelector(".progress-value").textContent = progress;
        document
            .querySelector(".progress-bar")
            .style.setProperty("--progress", progress);
    }

    displayMaterial() {
        const numbers = this.dm.getNumbers();
        const names = this.dm.getNames();
        for (let i = 0; i < 3; i++) {
            this.materialNumbers[i].value = numbers[i] === 0 ? "" : numbers[i];
            this.materialNames[i].textContent = names[i];
            this.materialImages[i].src = `img/${this.dm.currentID}-${i}.png`;
            this.materialImages[i].alt = names[i];
        }
        this.setProgress(numbers);
    }

    diaplayEnemies() {
        this.enemyCount = 0;
        this.enemies.innerHTML = "";
        this.dm.enemiesConfig.forEach((enemy) => this.addEnemy(enemy));
        if (this.enemyCount === 0) {
            this.addEnemy({
                name: "",
                level: 18,
                number: 0,
                activated: true,
            });
            this.inputEnemiesConfig();
        }
        document.querySelectorAll(".enemy-row-item").forEach((item) =>
            item.addEventListener("change", () => {
                this.inputEnemiesConfig();
                this.displayStatistics();
                this.displayCraft();
            })
        );
        document.querySelectorAll(".activate-enemy").forEach((item) =>
            item.addEventListener("change", () => {
                this.inputEnemiesConfig();
                this.displayStatistics();
                this.displayCraft();
            })
        );
    }

    addEnemy(enemy) {
        this.enemyCount += 1;

        // checkbox: active enemy row
        const checked = enemy.activated ? "checked" : "";
        let activateHTML = `
            <input
                type="checkbox"
                ${checked}
                class="activate-enemy enemy-row-${this.enemyCount}"
            />`;

        // select: enemy name
        let selectEnemyHTML = `
            <select
                class="enemy-row-item enemy-row-${this.enemyCount} select-enemy-name"
            >`;
        this.dm.enemyOptions.forEach((name) => {
            const selected = name === enemy.name ? "selected" : "";
            selectEnemyHTML += `<option ${selected}>${name}</option>`;
        });
        selectEnemyHTML += `</select>`;

        // select: enemy level range
        let selectLevelHTML = `
            <select
                class="enemy-row-item enemy-row-${this.enemyCount} select-level-range"
            >`;
        for (let level = 18; level >= 0; level--) {
            const selected = level === enemy.level ? "selected" : "";
            const range = this.dm.enemyLevelRanges[level];
            selectLevelHTML += `<option ${selected}>${range}</option>`;
        }
        selectLevelHTML += `</select>`;

        // input: enemy number
        const number = enemy.number === 0 ? "" : enemy.number;
        let inputNumberHTML = `
            <input
                type="text"
                value="${number}"
                placeholder="0"
                class="enemy-row-item enemy-row-${this.enemyCount} input-enemy-number" 
            />`;

        // button: delete enemy row
        let deleteEnemyHTML = `
            <ion-icon
                name="close-circle-outline"
                class="btn delete-row enemy-row-${this.enemyCount}"
                id="delete-enemy-row-${this.enemyCount}"
            ></ion-icon>`;

        const html =
            activateHTML +
            selectEnemyHTML +
            selectLevelHTML +
            inputNumberHTML +
            deleteEnemyHTML;
        this.enemies.insertAdjacentHTML("beforeend", html);

        this.removeEnemyRow(this.enemyCount);
    }

    removeEnemyRow(r) {
        const rowItems = document.querySelectorAll(`.enemy-row-${r}`);
        const btn = document.getElementById(`delete-enemy-row-${r}`);
        btn.addEventListener("click", () => {
            rowItems.forEach((item) => item.remove());
            this.inputEnemiesConfig();
        });
    }

    inputEnemiesConfig() {
        let config = [];
        const acts = [...document.querySelectorAll(".activate-enemy")].map(
            (item) => item.checked
        );
        const names = [...document.querySelectorAll(".select-enemy-name")].map(
            (item) => item.value
        );
        const levels = [
            ...document.querySelectorAll(".select-level-range"),
        ].map((item) => this.dm.enemyLevelRanges.indexOf(item.value));
        const numbers = [
            ...document.querySelectorAll(".input-enemy-number"),
        ].map((item) => +item.value);
        for (let i = 0; i < names.length; i++) {
            const enemy = {
                name: names[i],
                level: levels[i],
                number: numbers[i],
                activated: acts[i],
            };
            // console.log(enemy);
            config.push(enemy);
        }
        this.dm.enemiesConfig = config;
        this.displayStatistics();
    }

    displayStatistics() {
        const calculator = new Calculator(this.dm.getNumbers());
        calculator.setEnemies(
            this.dm.currentMaterial.enemies,
            this.dm.enemiesConfig
        );

        this.progressPerRun.textContent =
            Calculator.progress(
                ...calculator.materialsPerRun.map((num) => +num)
            ) + "%";

        this.materialsPerRun.innerHTML = `
            <div class="materials-per-run">
                每车材料
                <img src="img/${this.dm.currentID}-2.png" />
                ${calculator.materialsPerRun[2].toFixed(1)}
                <img src="img/${this.dm.currentID}-1.png" />
                ${calculator.materialsPerRun[1].toFixed(1)}
                <img src="img/${this.dm.currentID}-0.png" />
                ${calculator.materialsPerRun[0].toFixed(1)}
            </div>`;

        calculator.calculateRun(
            this.sucroseBonus.checked,
            this.doriBonus.checked
        );
        this.leftRunTimes.textContent = calculator.leftRunTimes;
    }

    get craftOptions() {
        return {
            sucroseBonus: this.sucroseBonus.checked,
            doriBonus: this.doriBonus.checked,
            noneBonus: this.noneBonus.checked,
        };
    }

    set craftOptions(options) {
        this.sucroseBonus.checked = options.sucroseBonus;
        this.doriBonus.checked = options.doriBonus;
        this.noneBonus.checked = options.noneBonus;
    }

    displayCraft() {
        this.craftOptions = this.dm.craftOptions;

        const calculator = new Calculator(this.dm.getNumbers());
        calculator.setEnemies(
            this.dm.currentMaterial.enemies,
            this.dm.enemiesConfig
        );

        calculator.trim(this.sucroseBonus.checked, this.doriBonus.checked);
        this.craftMediumEven.textContent = calculator.craftCount[0];
        this.craftHighEven.textContent = calculator.craftCount[1];

        const overflow = calculator.overflow(
            this.sucroseBonus.checked,
            this.doriBonus.checked
        );
        this.craftMediumOverflow.textContent = overflow[1];
        this.craftHighOverflow.textContent = overflow[2];
        this.craftMediumComplete.textContent = calculator.craftCount[0];
        this.craftHighComplete.textContent = calculator.craftCount[1];

        const numbers = this.dm.getNumbers();
        if (
            Math.trunc(numbers[0] / 3) > calculator.craftCount[0] ||
            Math.trunc(numbers[1] / 3) > calculator.craftCount[1]
        ) {
            this.craftAttention.classList.remove("hidden");
        } else {
            this.craftAttention.classList.add("hidden");
        }
    }

    get listOptions() {
        return {
            sortID: this.listSortID.checked,
            sortProgress: this.listSortProgress.checked,
            orderAscending: this.listOrderAscending.checked,
            orderDescending: this.listOrderDescending.checked,
            hideCompleted: this.listHideCompleted.checked,
        };
    }

    set listOptions(options) {
        this.listSortID.checked = options.sortID;
        this.listSortProgress.checked = options.sortProgress;
        this.listOrderAscending.checked = options.orderAscending;
        this.listOrderDescending.checked = options.orderDescending;
        this.listHideCompleted.checked = options.hideCompleted;
    }

    displayList() {
        this.list.innerHTML = "";
        this.listOptions = this.dm.listOptions;
        if (this.listOptions.sortProgress) {
            this.dm.sortMaterialsByProgress(this.listOptions.orderDescending);
        } else {
            this.dm.sortMaterialsByID(this.listOptions.orderDescending);
        }
        this.dm.materials.forEach((item) => this.insertListRow(item));
        document
            .getElementById(`list-material-${this.dm.currentID}`)
            .classList.add("list-row-selected");
    }

    insertListRow(material) {
        const numbers = this.dm.getNumbers(material.id);
        const progress = Calculator.progress(...numbers, 2);
        const names = this.dm.getNames(material.id);
        const elementID = `list-material-${material.id}`;
        const html = `
            <div class="list-row" id="${elementID}">
                <img src="img/${material.id}-2.png" alt="${names[2]}" />
                <span>${numbers[2]}</span>
                <img src="img/${material.id}-1.png" alt="${names[1]}" />
                <span>${numbers[1]}</span>
                <img src="img/${material.id}-0.png" alt="${names[0]}" />
                <span>${numbers[0]}</span>
                <div class="list-progress-container">
                    <div
                        class="list-progress-bar"
                        style="--progress: ${progress}%"
                    ></div>
                </div>
                <span class="list-progress-value">${progress}%<span>
            </div>`;
        this.list.insertAdjacentHTML("beforeend", html);

        const row = document.getElementById(elementID);
        if (this.listOptions.hideCompleted && progress === 100) {
            row.classList.add("hidden");
        }
        row.addEventListener("click", () => {
            this.dm.currentID = material.id;
            this.updateAll();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
}
