const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let angle = 0;

const drawCircle = (x, y, radius, hue, colorPicked) => {
    context.shadowColor = "transparent";
    context.fillStyle = "white";
    if (hue) {
        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
    }
    if (colorPicked) {
        context.fillStyle = colorPicked;
    }
    context.beginPath();
    context.arc(x, y, radius, 0, 360); // x, y, radius, start angle, end angle
    context.closePath();
    context.fill();
};

export const drawSmooth = (
    lastX,
    lastY,
    currentX,
    currentY,
    radius,
    hue,
    colorPicked
) => {
    const distance = Math.hypot(currentX - lastX, currentY - lastY);
    const numberOfCircles = Math.ceil(distance / radius) * 5;

    for (let i = 0; i < numberOfCircles; i++) {
        const progress = i / numberOfCircles;
        const x = lastX + (currentX - lastX) * progress;
        const y = lastY + (currentY - lastY) * progress;
        drawCircle(x, y, radius, hue, colorPicked);
    }
};

export const drawShape = (
    x,
    y,
    radius,
    numberOfSides,
    hue,
    colorPicked,
    isRotating
) => {
    context.shadowOffsetY = 5;
    context.shadowOffsetX = 5;
    context.shadowBlur = 10;
    context.shadowColor = "black";

    if (hue) {
        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
    }

    if (colorPicked) {
        context.fillStyle = colorPicked;
    }

    context.beginPath();
    context.save();
    context.translate(x, y);

    if (isRotating) {
        context.rotate(angle);
    }

    context.moveTo(0, -radius);
    for (let i = 0; i < numberOfSides; i++) {
        context.rotate((Math.PI * 2) / numberOfSides);
        context.lineTo(0, -radius);
    }

    if (isRotating) {
        angle += 0.1;
    }

    context.restore();
    context.closePath();
    context.stroke();
    context.fill();
};

export const clearCanvas = () => {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
};

export const resizeCanvas = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
};
