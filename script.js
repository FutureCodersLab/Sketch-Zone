import { drawSmooth } from "./canvas.js";

let isDrawing = false;
let hue = 0;
let lastX;
let lastY;
let colorPicked = null;

const canvas = document.getElementById("canvas");
const outerRadiusInput = document.querySelector("#outer-radius input");
const colorPickers = document.querySelector(".color-pickers");

window.addEventListener("mousedown", (e) => {
    if (e.target === canvas) {
        isDrawing = true;
        lastX = e.x;
        lastY = e.y;
    } else {
        isDrawing = false;
    }
});

window.addEventListener("mouseup", () => {
    isDrawing = false;
});

window.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        const outerRadius = outerRadiusInput.value;
        drawSmooth(lastX, lastY, e.x, e.y, outerRadius, hue, colorPicked);
        lastX = e.x;
        lastY = e.y;
        hue += 0.5;
    }
});

colorPickers.addEventListener("click", (e) => {
    const colorPicker = e.target;
    if (!colorPicker.id) return;
    if (colorPicker.id === "solid-color") {
        colorPicker.addEventListener("change", () => {
            colorPicked = e.target.value;
        });
    }
    if (colorPicker.id === "hue-cycling") {
        colorPicked = "";
        hue = 0;
    }

    const colorContainers = document.querySelectorAll(".color-container");

    colorContainers.forEach((container) => {
        container.classList.remove("active");
    });

    colorPicker.parentElement.classList.add("active");
});
