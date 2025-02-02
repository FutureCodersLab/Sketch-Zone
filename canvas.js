const canvas = document.getElementById("canvas");
/**@type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
const drawCircle = (x, y, outerRadius, hue, colorPicked) => {
    if (hue) {
        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
    }
    if (colorPicked) {
        context.fillStyle = colorPicked;
    }

    context.beginPath();
    context.arc(x, y, outerRadius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
};

export const drawSmooth = (
    lastX,
    lastY,
    currentX,
    currentY,
    outerRadius,
    hue,
    colorPicked
) => {
    const distance = Math.hypot(currentX - lastX, currentY - lastY);
    const numberOfCircles = Math.ceil(distance / outerRadius) * 5;
    for (let i = 0; i < numberOfCircles; i++) {
        const progress = i / numberOfCircles;
        const x = lastX + (currentX - lastX) * progress;
        const y = lastY + (currentY - lastY) * progress;
        drawCircle(x, y, outerRadius, hue, colorPicked);
    }
};
