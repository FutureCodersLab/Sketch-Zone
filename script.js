import { drawSmooth } from "./canvas.js";

const canvas = document.querySelector("canvas");
const outerRadiusInput = document.querySelector("#outer-radius input");
const solidColorPicker = document.querySelector("#solid-color");
const hueCyclingPicker = document.querySelector("#hue-cycling");

let isDrawing = false;
let hue = 0;
let colorPicked = null;
let lastX;
let lastY;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.x;
    lastY = e.y;
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

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

solidColorPicker.addEventListener("input", (e) => {
    colorPicked = e.target.value;

    solidColorPicker.parentElement.classList.add("active");
    hueCyclingPicker.parentElement.classList.remove("active");
});

hueCyclingPicker.addEventListener("click", () => {
    colorPicked = null;
    hue = 0;

    hueCyclingPicker.parentElement.classList.add("active");
    solidColorPicker.parentElement.classList.remove("active");
});
