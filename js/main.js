"use strict";

import { dataManager } from "./dataManager.js";
import { Calculator } from "./calculator.js";

const list = document.querySelector(".list-container");
const circularProgressOuter = document.querySelector(
    ".circular-progress-outer"
);
const circularProgressValue = document.querySelector(
    ".circular-progress-value"
);
const materialInputs = [
    document.getElementById("material-input-0"),
    document.getElementById("material-input-1"),
    document.getElementById("material-input-2"),
];
const materialImgs = [
    document.getElementById("material-img-0"),
    document.getElementById("material-img-1"),
    document.getElementById("material-img-2"),
];
const materialNames = [
    document.getElementById("material-name-0"),
    document.getElementById("material-name-1"),
    document.getElementById("material-name-2"),
];
const btnAdd = [
    document.getElementById("btn-material-input--add-0"),
    document.getElementById("btn-material-input--add-1"),
    document.getElementById("btn-material-input--add-2"),
];
const btnRemove = [
    document.getElementById("btn-material-input--remove-0"),
    document.getElementById("btn-material-input--remove-1"),
    document.getElementById("btn-material-input--remove-2"),
];

function fillList() {
    list.innerHTML = "";
    for (let material of dataManager.data) {
        let html = `<div class="list-row" id="material-${material.id}">`;
        if (material.id === dataManager.currentId) {
            html = `<div class="list-row list-selected" id="material-${material.id}">`;
        }
        for (let iImg = 2; iImg >= 0; iImg--) {
            html += `<div class="list-row-item">
                <img src="img/${material.id}-${iImg}.png" alt="${material.names[iImg]}" class="list-img" />
                <span class="list-number">${material.numbers[iImg]}</span></div>`;
        }
        html += `<div class="list-row-progress-bar">
            <div class="list-row-progress" style="--i: ${material.percent}%"></div></div></div>`;
        
        list.insertAdjacentHTML("beforeend", html);

        document
            .getElementById(`material-${material.id}`)
            .addEventListener("click", function () {
                dataManager.switchTo(material.id);
                fillMaterialPanel();
                fillProgress();
                fillList();
            });
    }
}
fillList();

function fillProgress(speed = 10) {
    const progressValue = dataManager.currentMaterial.percent;
    let step = 0;
    const progress = setInterval(() => {
        step += 1;
        if (step >= progressValue) {
            step = progressValue;
            clearInterval(progress);
        }
        circularProgressValue.textContent = step;
        circularProgressOuter.style.background = `
            conic-gradient(#20c997 ${step * 3.6}deg, #c3fae8 0deg)`;
    }, speed);
}
fillProgress();

function fillMaterialPanel() {
    const material = dataManager.currentMaterial;
    for (let i = 0; i < 3; i++) {
        materialImgs[i].src = `img/${material.id}-${i}.png`;
        materialImgs[i].alt = material.names[i];
        materialNames[i].textContent = material.names[i];
        let number = material.numbers[i];
        materialInputs[i].value = number > 0 && number < 9999 ? number : "";
    }
}
fillMaterialPanel();

materialInputs.forEach((input, index) => {
    const material = dataManager.currentMaterial;
    input.addEventListener("change", () => {
        const inputNumber = Number(input.value);
        if (inputNumber < 0 || inputNumber > 9999) {
            alert("Invalid number!");
            input.value = "";
            material.numbers[index] = 0;
        } else if (inputNumber === 0) {
            input.value = "";
            material.numbers[index] = 0;
        } else {
            material.numbers[index] = inputNumber;
        }
        const calc = new Calculator(material);
        material.percent = calc.percent;
        dataManager.saveData();
        fillList();
        fillProgress();
    });
});

btnAdd.forEach((btn, index) => {
    const material = dataManager.currentMaterial;
    btn.addEventListener("click", () => {
        if (material.numbers[index] < 9999) {
            material.numbers[index] += 1;
            materialInputs[index].value = material.numbers[index];
            const calc = new Calculator(material);
            material.percent = calc.percent;
            dataManager.saveData();
            fillList();
            fillProgress();
        }
    });
});

btnRemove.forEach((btn, index) => {
    const material = dataManager.currentMaterial;
    btn.addEventListener("click", () => {
        if (material.numbers[index] > 0) {
            material.numbers[index] -= 1;
            materialInputs[index].value = material.numbers[index];
            const calc = new Calculator(material);
            material.percent = calc.percent;
            dataManager.saveData();
            fillList();
            fillProgress();
        }
    });
});
