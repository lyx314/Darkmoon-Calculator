"use strict";

const list = document.querySelector(".list-container");
list.innerHTML = "";

for (let i = 1; i <= 31; i++) {
    let html = `
        <div class="list-row" id="material-${i}">
            <div class="list-row-item">
                <img src="img/${i}-2.png" alt="" class="list-img" />
                    <span class="list-number">${(
                        Math.random() * 10000
                    ).toFixed()}</span>
            </div>
            <div class="list-row-item">
                <img src="img/${i}-1.png" alt="" class="list-img" />
                <span class="list-number">${(
                    Math.random() * 10000
                ).toFixed()}</span>
            </div>
            <div class="list-row-item">
                <img src="img/${i}-0.png" alt="" class="list-img" />
                <span class="list-number">${(
                    Math.random() * 10000
                ).toFixed()}</span>
            </div>
            <div class="list-row-progress-bar">
                <div class="list-row-progress" style="--i:${
                    Math.random() * 100
                }%"></div>
            </div>
        </div>`;
    list.insertAdjacentHTML("beforeend", html);
}

document.querySelectorAll(".list-row");