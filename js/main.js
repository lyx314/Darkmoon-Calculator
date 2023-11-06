"use strict";

import { dataManager } from "./dataManager.js";

const list = document.querySelector(".list-container");
const circularProgressOuterEl = document.querySelector(
    ".circular-progress-outer"
);
const circularValueEl = document.querySelector(".circular-progress-value");

function fillList() {
    list.innerHTML = "";
    for (let material of dataManager.data) {
        let html = `<div class="list-row" id="material-${material.id}">`;
        for (let img = 2; img >= 0; img--) {
            html += `<div class="list-row-item">
                <img src="img/${material.id}-${img}.png" alt="${material.names[img]}" class="list-img" />
                <span class="list-number">${material.numbers[img]}</span></div>`;
        }

        html += `<div class="list-row-progress-bar">
            <div class="list-row-progress" style="--i: ${material.percent}%"></div></div></div>`;
        list.insertAdjacentHTML("beforeend", html);

        document
            .getElementById(`material-${material.id}`)
            .addEventListener("click", function () {
                dataManager.switchTo(material.id);
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
        circularValueEl.textContent = step;
        circularProgressOuterEl.style.background = `
            conic-gradient(#20c997 ${step * 3.6}deg, #c3fae8 0deg)`;
    }, speed);
}
fillProgress();
