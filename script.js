"use strict";

// import
import { Calculator } from "./calculator.js";
import jsonData from "./data.json" assert { type: "json" };

// select elements
const list = document.querySelector(".list");
const totalPorgressBar = document.querySelector(".total-progress-bar");
const totalPorgressValue = document.querySelector(".total-progress-value");
const enemyTable = document.querySelector(".enemy-table");
const materialImages = [
    ...document.querySelectorAll(".material-img"),
].reverse();
const inputs = [...document.querySelectorAll(".input")].reverse();
const progressBars = [...document.querySelectorAll(".progress-bar")].reverse();
const checkboxSortId = document.getElementById("sort-by-id");
const checkboxSortProgress = document.getElementById("sort-by-progress");
const checkboxAscending = document.getElementById("ascending");
const checkboxDescending = document.getElementById("descending");
const checkboxHideComplete = document.getElementById("hide-complete");
const checkboxSucrose = document.getElementById("sucrose-bonus");
const checkboxDori = document.getElementById("dori-bonus");
const buttonLast = document.getElementById("button-last");
const buttonNext = document.getElementById("button-next");
const buttonCraftHigh = document.getElementById("button-craft-high");
const buttonCraftMedium = document.getElementById("button-craft-medium");
const modal = document.querySelector(".modal");

// init
let data, currentId;
const init = function () {
    const cachedData = JSON.parse(localStorage.getItem("darkmoonCalculator"));
    data = cachedData ? cachedData : jsonData;
    console.log(data);
    currentId = localStorage.getItem("currentId")
        ? Number(localStorage.getItem("currentId"))
        : 1;
    console.log("CurrentId: " + currentId);
};
init();

const findMaterial = function (id) {
    return data.find((item) => item.id === id);
};

const saveData = function () {
    localStorage.setItem("darkmoonCalculator", JSON.stringify(data));
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
            console.log("CurrentId: " + currentId);
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
    data.forEach(function (item) {
        printListItem(item);
    });
};

const printList = function () {
    if (checkboxSortId.checked) {
        printListById(checkboxDescending.checked);
    }
    if (checkboxSortProgress.checked) {
        printListByProgress(checkboxDescending.checked);
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
        materialImages[i].src = `images/${item.id}-${i}.png`;
        inputs[i].value = item.numbers[i] == 0 ? "" : String(item.numbers[i]);
        progressBars[i].value = String(item.numbers[i]);
    }

    // 总进度
    const progress = calc.progress();
    totalPorgressBar.value = progress;
    totalPorgressValue.textContent = `${(progress * 100).toFixed(2)}%`;
    item.progress = progress;
    saveData();

    // 配平合成
    calc.craft(checkboxSucrose.checked, checkboxDori.checked);
    document.getElementById("balancing-craft-medium").textContent =
        calc.craftCounters[0];
    document.getElementById("balancing-craft-high").textContent =
        calc.craftCounters[1];

    // 剩余敌人
    enemyTable.innerHTML = "";
    item.enemies = calc.calculateEnemies(
        checkboxSucrose.checked,
        checkboxDori.checked
    );
    for (let [rowIndex, enemy] of item.enemies.entries()) {
        let html = `
            <tr>
                <td>${enemy.name}</td>
                <td>${enemy.type}</td>
                <td>${enemy.count}</td>
                <td>
                    <input
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
            if (inputNumber > 0) {
                enemy.enemiesPerRun = inputNumber;
            } else {
                this.value = "";
                delete enemy.enemiesPerRun;
            }
            calc.setEnemies(item.enemies);
            writeRuntimes(
                calc.calculateRuntimes(
                    checkboxSucrose.checked,
                    checkboxDori.checked
                )
            );
            saveData();
        });
    }
    writeRuntimes(
        calc.calculateRuntimes(checkboxSucrose.checked, checkboxDori.checked)
    );
    document.getElementById("all-craft-high").textContent =
        calc.craftCounters[1];
    document.getElementById("all-craft-medium").textContent =
        calc.craftCounters[0];
    document.getElementById("out-of-max-high").textContent =
        calc.outOfMax[2] > calc.dropPerRun[2] ? calc.outOfMax[2] : 0;
    document.getElementById("out-of-max-medium").textContent =
        calc.outOfMax[1] > calc.dropPerRun[1] ? calc.outOfMax[1] : 0;
};
fillPanel();

inputs.forEach(function (input, i) {
    input.addEventListener("change", function () {
        const item = findMaterial(currentId);
        const inputNumber = Number(input.value);
        if (inputNumber < 0 || inputNumber > 9999) {
            input.value = "";
            return;
        }
        item.numbers[i] = input.value === "" ? "0" : input.value;
        saveData();
        fillPanel();
        printList();
    });
});

document.querySelector(".clear-data").addEventListener("click", function () {
    window.localStorage.clear();
    init();
    fillPanel();
    printList();
});

buttonLast.addEventListener("click", function () {
    if (currentId > 1) {
        currentId -= 1;
        localStorage.setItem("currentId", currentId);
        fillPanel();
    }
});

buttonNext.addEventListener("click", function () {
    if (currentId < data.length) {
        currentId += 1;
        localStorage.setItem("currentId", currentId);
        fillPanel();
    }
});

checkboxSucrose.addEventListener("click", function () {
    if (this.checked) {
        checkboxDori.checked = false;
    }
    fillPanel();
});

checkboxDori.addEventListener("click", function () {
    if (this.checked) {
        checkboxSucrose.checked = false;
    }
    fillPanel();
});

buttonCraftHigh.addEventListener("click", function () {
    let input = prompt(`
    请输入合成高阶的数量。
    如果有额外的合成，请用空格分隔。
    例如：1000 100`);
    input = input.trim().split(/\s+/);
    const item = findMaterial(currentId);
    let high = Number(item.numbers[2]) + Number(input[0]);
    let medium = Number(item.numbers[1]) - 3 * Number(input[0]);
    if (input.length > 1) {
        if (checkboxSucrose.checked) {
            high += Number(input[1]);
        }
        if (checkboxDori.checked) {
            medium += Number(input[1]);
        }
    }
    if (high > 9999 || medium < 0) {
        alert("Invalid input");
        return;
    }
    item.numbers[2] = String(high);
    item.numbers[1] = String(medium);
    saveData();
    fillPanel();
    printList();
});

buttonCraftMedium.addEventListener("click", function () {
    let input = prompt(`
    请输入合成中阶的数量。
    如果有额外的合成，请用空格分隔。
    例如：1000 100`);
    input = input.trim().split(/\s+/);
    const item = findMaterial(currentId);
    let medium = Number(item.numbers[1]) + Number(input[0]);
    let low = Number(item.numbers[0]) - 3 * Number(input[0]);
    if (input.length > 1) {
        if (checkboxSucrose.checked) {
            medium += Number(input[1]);
        }
        if (checkboxDori.checked) {
            low += Number(input[1]);
        }
    }
    if (medium > 9999 || low < 0) {
        alert("Invalid input");
        return;
    }
    item.numbers[1] = String(medium);
    item.numbers[0] = String(low);
    saveData();
    fillPanel();
    printList();
});
