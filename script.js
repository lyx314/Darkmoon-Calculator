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
const inputs = [
    document.getElementById("input-0"),
    document.getElementById("input-1"),
    document.getElementById("input-2"),
];
const progressBars = [
    document.getElementById("progress-bar-0"),
    document.getElementById("progress-bar-1"),
    document.getElementById("progress-bar-2"),
];
const checkboxSortId = document.getElementById("sort-by-id");
const checkboxSortProgress = document.getElementById("sort-by-progress");
const checkboxAscending = document.getElementById("ascending");
const checkboxDescending = document.getElementById("descending");
const checkboxHideComplete = document.getElementById("hide-complete");

// data
const cachedData = JSON.parse(localStorage.getItem("darkmoonCalculator"));
const data = cachedData ? cachedData : jsonData;

let currentId = localStorage.getItem("currentId")
    ? Number(localStorage.getItem("currentId"))
    : 1;
const findMaterial = (id) => data.find((item) => item.id === id);

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
        //降序
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
printList();

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

const fillPanel = function () {
    const item = findMaterial(currentId);

    // 图片、数量、分进度条
    for (let i = 0; i < 3; i++) {
        materialsImages[i].src = `images/${currentId}-${i}.png`;
        if (item.numbers[i] === 0) {
            inputs[i].value = "";
        } else {
            inputs[i].value = item.numbers[i];
        }
        progressBars[i].value = item.numbers[i];
    }

    // 总进度
    totalPorgressBar.value = item.progress;
    totalPorgressValue.textContent = `${(item.progress * 100).toFixed(2)}%`;

    const calc = new Calculator(...item.numbers);
    calc.craft();

    // 配平合成
    document.getElementById("balancing-craft-medium").textContent =
        calc.craftCounters[0];
    document.getElementById("balancing-craft-high").textContent =
        calc.craftCounters[1];

    // 剩余敌人
    enemyTable.innerHTML = "";
    for (let [rowIndex, enemy] of item.enemies.entries()) {
        calc.setEnemy(...enemy.drop);
        calc.calculate();
        let html = `
            <tr>
                <td>${enemy.name}</td>
                <td>${enemy.type}</td>
                <td id="enemy-count-${rowIndex}">
                    ${calc.enemyCounter}
                </td>
                <td>
                    <input
                        type="number"
                        class="table-input"
                        id="table-input-${rowIndex}"
                    />
                </td>
                <td id="run-times-${rowIndex}"> - </td>
            </tr>`;
        enemyTable.insertAdjacentHTML("beforeend", html);
        const leftEnemies = document.getElementById(`enemy-count-${rowIndex}`);
        const leftRuntimes = document.getElementById(`run-times-${rowIndex}`);
        const tableInput = document.getElementById(`table-input-${rowIndex}`);
        if (enemy.enemiesPerRun > 0) {
            tableInput.value = enemy.enemiesPerRun;
            leftRuntimes.textContent = (
                Number(leftEnemies.textContent) / enemy.enemiesPerRun
            ).toFixed(1);
        }
        tableInput.addEventListener("change", function () {
            const inputNumber = Number(this.value);
            if (inputNumber > 0) {
                leftRuntimes.textContent = (
                    Number(leftEnemies.textContent) / inputNumber
                ).toFixed(1);
                enemy.enemiesPerRun = inputNumber;
            } else {
                this.value = "";
                leftRuntimes.textContent = "-";
                delete enemy.enemiesPerRun;
            }
            localStorage.setItem("darkmoonCalculator", JSON.stringify(data));
        });
    }
    document.getElementById("all-craft-high").textContent =
        calc.craftCounters[1];
    document.getElementById("all-craft-medium").textContent =
        calc.craftCounters[0];
    document.getElementById("out-of-max-high").textContent = calc.outOfMax[2];
    document.getElementById("out-of-max-medium").textContent = calc.outOfMax[1];
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
    const calc = new Calculator(...item.numbers);
    item.progress = calc.progress();
    localStorage.setItem("darkmoonCalculator", JSON.stringify(data));
    fillPanel();
    printList();
};

inputs.forEach(function (input) {
    input.addEventListener("change", onInputChange);
});
