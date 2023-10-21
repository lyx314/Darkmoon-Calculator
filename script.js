"use strict";

// import
import { Calculator } from "./calculator.js";
import jsonData from "./data.json" assert { type: "json" };

// select elements
const list = document.querySelector(".list");
const totalPorgressBar = document.querySelector(".total-progress-bar");
const totalPorgressValue = document.querySelector(".total-progress-value");
const enemyTable = document.querySelector(".enemy-table");
const materialsImages = [
    document.getElementById("material-img-0"),
    document.getElementById("material-img-1"),
    document.getElementById("material-img-2"),
];
const inputs = [...document.querySelectorAll(".input")].reverse();
const progressBars = [...document.querySelectorAll(".progress-bar")].reverse();

const checkboxSortId = document.getElementById("sort-by-id");
const checkboxSortProgress = document.getElementById("sort-by-progress");
const checkboxAscending = document.getElementById("ascending");
const checkboxDescending = document.getElementById("descending");
const checkboxHideComplete = document.getElementById("hide-complete");

// init
let data, currentId;
const init = function () {
    const cachedData = JSON.parse(localStorage.getItem("darkmoonCalculator"));
    data = cachedData ? cachedData : jsonData;
    console.log(data);
    currentId = localStorage.getItem("currentId")
        ? Number(localStorage.getItem("currentId"))
        : 1;
};
init();

const findMaterial = function (id) {
    return data.find((item) => item.id === id);
};

const printListItem = function (item) {
    if (checkboxHideComplete.checked && item.progress === 1) {
        return;
    }
    const html = `
            <div class="list-row" id="list-row-${item.id}"> 
                <img
                    src="images/${item.id}-2.png" 
                    class="list-icon"
                />${item.numbers[2]}
                <img
                    src="images/${item.id}-1.png" 
                    class="list-icon"
                />${item.numbers[1]}
                <img
                    src="images/${item.id}-0.png" 
                    class="list-icon"
                />${item.numbers[0]}
                <progress
                    value="${item.progress}"
                    max="1"
                    class="list-progress"
                ></progress>
                ${(item.progress * 100).toFixed(2)}%
            </div>`;
    list.insertAdjacentHTML("beforeend", html);
    document
        .getElementById(`list-row-${item.id}`)
        .addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
            currentId = item.id;
            localStorage.setItem("currentId", currentId);
            fillPanel();
        });
};

const printListById = function (desc = false) {
    list.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let id = i + 1;
        if (desc) {
            id = data.length - i;
        }
        const item = findMaterial(id);
        printListItem(item);
    }
};

const printListByProgress = function (desc = false) {
    if (desc) {
        // 降序
        data.sort((a, b) => b.progress - a.progress);
    } else {
        // 升序
        data.sort((a, b) => a.progress - b.progress);
    }
    list.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        printListItem(data[i]);
    }
};

const printList = function () {
    if (checkboxSortId.checked) {
        if (checkboxAscending.checked) {
            printListById(false);
        } else {
            printListById(true);
        }
    } else {
        if (checkboxAscending.checked) {
            printListByProgress(false);
        } else {
            printListByProgress(true);
        }
    }
};
printList(); // init call

checkboxSortId.addEventListener("click", function () {
    if (this.checked) {
        checkboxSortProgress.checked = false;
        printList();
    }
    if (!this.checked) {
        this.checked = true;
    }
});
checkboxSortProgress.addEventListener("click", function () {
    if (this.checked) {
        checkboxSortId.checked = false;
        printList();
    }
    if (!this.checked) {
        this.checked = true;
    }
});
checkboxAscending.addEventListener("click", function () {
    if (this.checked) {
        checkboxDescending.checked = false;
        printList();
    }
    if (!this.checked) {
        this.checked = true;
    }
});
checkboxDescending.addEventListener("click", function () {
    if (this.checked) {
        checkboxAscending.checked = false;
        printList();
    }
    if (!this.checked) {
        this.checked = true;
    }
});
checkboxHideComplete.addEventListener("click", function () {
    printList();
});

const writeRuntimes = function (value) {
    document.getElementById("run-times-0").textContent = value;
};

const fillPanel = function () {
    const item = findMaterial(currentId);
    const calc = new Calculator(item);

    // 图片、数量、分进度条
    for (let i = 0; i < 3; i++) {
        materialsImages[i].src = `images/${currentId}-${i}.png`;
        inputs[i].value = item.numbers[i] === 0 ? "" : item.numbers[i];
        progressBars[i].value = item.numbers[i];
    }

    // 总进度
    totalPorgressBar.value = item.progress;
    totalPorgressValue.textContent = `${(item.progress * 100).toFixed(2)}%`;

    // 配平合成
    calc.craft();
    document.getElementById("balancing-craft-medium").textContent =
        calc.craftCounters[0];
    document.getElementById("balancing-craft-high").textContent =
        calc.craftCounters[1];

    // 剩余敌人
    enemyTable.innerHTML = "";
    item.enemies = calc.calculateEnemies();
    for (let [rowIndex, enemy] of item.enemies.entries()) {
        let html = `
            <tr>
                <td>${enemy.name}</td>
                <td>${enemy.type}</td>
                <td>${enemy.count}</td>
                <td>
                    <input
                        type="number"
                        class="table-input"
                        id="table-input-${rowIndex}"
                    />
                </td>
                <td id="run-times-${rowIndex}"></td>
            </tr>`;
        enemyTable.insertAdjacentHTML("beforeend", html);
        const tableInput = document.getElementById(`table-input-${rowIndex}`);
        if (enemy.enemiesPerRun > 0) {
            tableInput.value = enemy.enemiesPerRun;
        }
        tableInput.addEventListener("change", function () {
            const inputNumber = Number(this.value);
            if (inputNumber >= 1) {
                enemy.enemiesPerRun = inputNumber;
            } else {
                this.value = "";
                delete enemy.enemiesPerRun;
            }
            calc.setEnemies(item.enemies);
            writeRuntimes(calc.calculateRuntimes());
            localStorage.setItem("darkmoonCalculator", JSON.stringify(data));
        });
    }
    writeRuntimes(calc.calculateRuntimes());
    document.getElementById("all-craft-high").textContent =
        calc.craftCounters[1];
    document.getElementById("all-craft-medium").textContent =
        calc.craftCounters[0];
    document.getElementById("out-of-max-high").textContent =
        calc.outOfMax[2] > calc.dropPerRun[2] ? calc.outOfMax[2].toFixed(1) : 0;
    document.getElementById("out-of-max-medium").textContent =
        calc.outOfMax[1] > calc.dropPerRun[1] ? calc.outOfMax[1].toFixed(1) : 0;
};
fillPanel();

const onInputChange = function () {
    const item = findMaterial(currentId);
    for (let i = 0; i < inputs.length; i++) {
        const inputNumber = Number(inputs[i].value);
        if (inputNumber < 0 || inputNumber > 9999) {
            inputs[i].value = "";
            return;
        }
        item.numbers[i] = inputNumber;
    }
    const calc = new Calculator(item);
    item.progress = calc.progress();
    localStorage.setItem("darkmoonCalculator", JSON.stringify(data));
    fillPanel();
    printList();
};

inputs.forEach(function (input) {
    input.addEventListener("change", onInputChange);
});
