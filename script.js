import { clearCanvas, drawShape, drawSmooth, resizeCanvas } from "./canvas.js";

const canvas = document.querySelector("canvas");
const radiusInput = document.querySelector("#radius input");
const solidColorPicker = document.querySelector("#solid-color");
const hueCyclingPicker = document.querySelector("#hue-cycling");

const modeButtons = document.querySelector(".mode-buttons");
const numberOfSidesInput = document.querySelector("#number-of-sides input");
const clearButton = document.querySelector("#clear");
const downloadButton = document.querySelector("#download");

let isDrawing = false;
let colorPicked = null;
let hue = 0;
let lastX;
let lastY;

let drawingMode = "smooth";
let isRotating = true;

window.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        draw(e.x, e.y);
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
    hueCyclingPicker.parentElement.classList.remove("active");
});

hueCyclingPicker.addEventListener("click", () => {
    colorPicked = null;
    hue = 0;

    hueCyclingPicker.parentElement.classList.add("active");
    solidColorPicker.parentElement.classList.remove("active");
});

modeButtons.addEventListener("click", (e) => {
    const selectedButton = e.target;

    [...modeButtons.children].forEach((button) => {
        button.classList.remove("active");
    });

    selectedButton.classList.add("active");

    drawingMode = selectedButton.id;
});

const draw = (x, y) => {
    const radius = radiusInput.value;
    const numberOfSides = numberOfSidesInput.value;

    if (drawingMode === "smooth") {
        drawSmooth(lastX, lastY, x, y, radius, hue, colorPicked);
    }
    if (drawingMode === "eraser") {
        drawSmooth(lastX, lastY, x, y, radius);
    }
    if (drawingMode === "shape") {
        drawShape(x, y, radius, numberOfSides, hue, colorPicked, isRotating);
    }

    lastX = x;
    lastY = y;
    hue += 0.5;
};

clearButton.addEventListener("click", clearCanvas);

downloadButton.addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = `${new Date().getTime()}.jpg`;
    a.href = canvas.toDataURL();
    a.click();
});

window.addEventListener("resize", resizeCanvas);

window.addEventListener("touchmove", (e) => {
    if (isDrawing) {
        const touch = e.touches[0];
        draw(touch.clientX, touch.clientY);
    }
});

canvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    const touch = e.touches[0];
    lastX = touch.clientX;
    lastY = touch.clientY;
});

canvas.addEventListener("touchend", () => {
    isDrawing = false;
});

document.addEventListener("keydown", (e) => {
    if (e.key === "r") {
        isRotating = !isRotating;
    }
});
