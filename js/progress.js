"use strict";

const circularProgressOuterEl = document.querySelector(
    ".circular-progress-outer"
);
const circularValueEl = document.querySelector(".circular-progress-value");

let progressValue = 0,
    progressEndValue = 72.4,
    speed = 10;

const progress = setInterval(function () {
    progressValue += 1;
    if (progressValue >= progressEndValue) {
        progressValue = progressEndValue;
        clearInterval(progress);
    }
    let angle = progressValue * 3.6;
    circularValueEl.textContent = progressValue;
    circularProgressOuterEl.style.background = `conic-gradient(#20c997 ${angle}deg, #c3fae8 0deg)`;
}, speed);
