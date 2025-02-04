import { clearCanvas, drawShape, drawSmooth, resizeCanvas } from "./canvas.js";

const canvas = document.getElementById("canvas");

let drawingMode = "smooth";
let isDrawing = false;
let isRotating = true;
let colorPicked;
let hue = 0;
let lastX;
let lastY;

const outerRadiusInput = document.querySelector("#outer-radius input");
const innerRadiusInput = document.querySelector("#inner-radius input");
const numberOfSidesInput = document.querySelector("#number-of-sides input");
const colorPickers = document.querySelector(".color-pickers");
const modeButtons = document.querySelector(".mode-buttons");
const clearButton = document.querySelector("#clear");
const downloadButton = document.querySelector("#download");

window.addEventListener("mousedown", (e) => {
    if (e.target === canvas) {
        isDrawing = true;
        lastX = e.x;
        lastY = e.y;
    } else {
        isDrawing = false;
    }
});

window.addEventListener("mouseup", () => (isDrawing = false));

window.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        draw(e.x, e.y);
    }
});

const draw = (x, y) => {
    const outerRadius = outerRadiusInput.value;
    const innerRadius = innerRadiusInput.value;
    const numberOfSides = numberOfSidesInput.value;

    if (drawingMode === "smooth") {
        drawSmooth(lastX, lastY, x, y, outerRadius, hue, colorPicked);
    }
    if (drawingMode === "eraser") {
        drawSmooth(lastX, lastY, x, y, outerRadius);
    }
    if (drawingMode === "shape") {
        drawShape(
            x,
            y,
            outerRadius,
            innerRadius,
            numberOfSides,
            hue,
            colorPicked,
            isRotating
        );
    }

    lastX = x;
    lastY = y;
    hue += 0.5;
};

colorPickers.addEventListener("click", (e) => {
    const colorPicker = e.target;

    if (!colorPicker.id) return;

    if (colorPicker.id === "solid-color") {
        colorPicker.addEventListener(
            "change",
            () => (colorPicked = e.target.value)
        );
    }

    if (colorPicker.id === "hue-cycling") {
        colorPicked = "";
        hue = 0;
    }

    document.querySelectorAll(".color-container").forEach((container) => {
        container.classList.remove("active");
    });

    colorPicker.parentElement.classList.add("active");
});

modeButtons.addEventListener("click", (e) => {
    const selectedButton = e.target;

    if (!selectedButton.id) return;

    Array.from(modeButtons.children).forEach((button) =>
        button.classList.remove("active")
    );
    selectedButton.classList.add("active");
    drawingMode = selectedButton.id;

    if (drawingMode === "shape") {
        innerRadiusInput.parentElement.classList.add("active");
        numberOfSidesInput.parentElement.classList.add("active");
    } else {
        innerRadiusInput.parentElement.classList.remove("active");
        numberOfSidesInput.parentElement.classList.remove("active");
    }
});

clearButton.addEventListener("click", clearCanvas);

downloadButton.addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = `${new Date().getTime()}.jpg`;
    a.href = canvas.toDataURL();
    a.click();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "r") {
        isRotating = !isRotating;
    }
});

window.addEventListener("resize", resizeCanvas);

window.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    if (e.target === canvas) {
        isDrawing = true;
        lastX = touch.clientX;
        lastY = touch.clientY;
    } else {
        isDrawing = false;
    }
});

window.addEventListener("touchend", () => (isDrawing = false));

window.addEventListener("touchmove", (e) => {
    if (isDrawing) {
        const touch = e.touches[0];
        draw(touch.clientX, touch.clientY);
    }
});
