import { drawSmooth } from "./canvas.js";

const canvas = document.querySelector("canvas");
const outerRadiusInput = document.querySelector("#outer-radius input");
const solidColorPicker = document.querySelector("#solid-color");
const hueCyclingColorPicker = document.querySelector("#hue-cycling");

let isDrawing = false;
let hue = 0;
let colorPicked = null;
let lastX;
let lastY;

window.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        const outerRadius = outerRadiusInput.value;
        drawSmooth(lastX, lastY, e.x, e.y, outerRadius, hue, colorPicked);
        lastX = e.x;
        lastY = e.y;
        hue += 0.5;
    }
});

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.x;
    lastY = e.y;
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

solidColorPicker.addEventListener("input", (e) => {
    colorPicked = e.target.value;

    solidColorPicker.parentElement.classList.add("active");
    hueCyclingColorPicker.parentElement.classList.remove("active");
});

hueCyclingColorPicker.addEventListener("click", () => {
    colorPicked = null;
    hue = 0;

    hueCyclingColorPicker.parentElement.classList.add("active");
    solidColorPicker.parentElement.classList.remove("active");
});
