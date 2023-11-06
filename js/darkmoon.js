"use strict";

import { DataManager } from "./dataManager.js";
import { Calculator } from "./calculator.js";

const list = document.querySelector(".list");
const sortProgress = document.getElementById("sort--progress");
const sortId = document.getElementById("sort--id");
const sortAscending = document.getElementById("sort--ascending");
const sortDescending = document.getElementById("sort--descending");
const hideCompleted = document.getElementById("sort--hide-completed");

export class Darkmoon {
    #dataManager;
    #currentMaterial;

    constructor() {
        this.#dataManager = new DataManager();
        this.#currentMaterial = this.#dataManager.getMaterial();
    }

    start() {
        console.log("Start app.");

        this.#setListOptions();
        this.#displayList();
        this.#displayMaterial();
    }

    #setListOptions() {
        sortProgress.addEventListener("change", () => {
            if (sortProgress.checked) {
                console.log("Sort materials list by progress.");

                sortId.checked = false;
                this.#displayList();
            } else {
                sortProgress.checked = true;
            }
        });

        sortId.addEventListener("change", () => {
            if (sortId.checked) {
                console.log("Sort materials list by id.");

                sortProgress.checked = false;
                this.#displayList();
            } else {
                sortId.checked = true;
            }
        });

        sortAscending.addEventListener("change", () => {
            if (sortAscending.checked) {
                console.log("Sort materials list in ascending order.");

                sortDescending.checked = false;
                this.#displayList();
            } else {
                sortAscending.checked = true;
            }
        });

        sortDescending.addEventListener("change", () => {
            if (sortDescending.checked) {
                console.log("Sort materials list in descending order.");

                sortAscending.checked = false;
                this.#displayList();
            } else {
                sortDescending.checked = true;
            }
        });

        hideCompleted.addEventListener("change", () => {
            const option = hideCompleted.checked ? "Hide" : "Show";
            console.log(`${option} completed materials`);
            this.#displayList();
        });
    }

    #displayList() {
        console.log("Display materials list.");

        list.innerHTML = "";
        const sortKey = sortProgress.checked ? "percent" : "id";
        this.#dataManager.sort(sortKey, sortDescending.checked);
        this.#dataManager.data.forEach(m => this.#insertListRow(m));
    }

    #insertListRow(material) {
        if (hideCompleted.checked && material.percent === 100) return;

        const elementId = `list-material-${material.id}`;
        const materialsElement = material.numbers.reduceRight(
            (materialHtml, num, index) =>
                materialHtml +
                `<img src="img/${material.id}-${index}.png" />
                 <span>${num}</span>`,
            ""
        );

        const html = `
            <ion-icon
                name="arrow-back-circle-outline"
                class="btn--list-material"
                id="${elementId}"
            ></ion-icon>
            ${materialsElement}
            <div class="list-progress-container">
                <div
                    class="list-progress-bar"
                    style="--len: ${material.percent}%"
                ></div>
            </div>`;

        list.insertAdjacentHTML("beforeend", html);

        document.getElementById(elementId).addEventListener("click", () => {
            if (material.id !== this.#dataManager.currentId) {
                this.#dataManager.switchTo(material.id);
                this.#currentMaterial = material;
                this.#displayMaterial();
            }
        });
    }

    #displayMaterial() {
        console.log(
            `Display current material (id: ${this.#dataManager.currentId}).`
        );

        const calc = new Calculator(this.#currentMaterial);
    }
}
