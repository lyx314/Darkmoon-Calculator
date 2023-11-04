const circularProgressEl = document.querySelector(".circular-progress");
const circularValueEl = document.querySelector(".progress-value");

let progressValue = 0,
    progressEndValue = 80.3,
    speed = 10;

const progress = setInterval(function () {
    progressValue += 1;
    if (progressValue >= progressEndValue) {
        progressValue = progressEndValue;
        clearInterval(progress);
    }

    circularValueEl.textContent = `${progressValue}%`;
    circularProgressEl.style.background = `conic-gradient(#20c997 ${
        progressValue * 3.6
    }deg, #c3fae8 0deg)`;
}, speed);
