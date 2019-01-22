import {IDrawable, IPoint, IColor, IState} from "./types";
import {
    isIntersecting, createPointLabels,
    getParallelogramMassCenter, getParallelogramArea,
    getCircleRadiusByArea,
} from "./utils";
import {handleClick, handleMove, handleUp} from "./event-handlers";

import createCircle from "./shapes/circle";
import createLine from "./shapes/line";
import createText from "./shapes/text";

import {RADIUS} from "./constants";

function main() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const resetButton = document.getElementById("reset-state");

    const state: IState = {
        points: [],
    };

    resetButton.addEventListener("click", (e) => {
        e.preventDefault();
        state.points = [];
    });

    const canvasWidth =
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 20;

    const canvasHeight = 600;

    setupCanvas(canvas, ctx, canvasWidth, canvasHeight);
    registerCanvasListeners(canvas, state);

    runRenderLoop(ctx, canvasWidth, canvasHeight, state);
}

function resetContext(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 1;
}

function runRenderLoop(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    state: IState,
) {
    function animate() {
        requestAnimationFrame(animate);

        ctx.clearRect(0, 0, width, height);
        const entities = getDrawables(state);
        entities.forEach((entity) => {
            resetContext(ctx);
            entity.draw(ctx);
        });
    }

    animate();
}

function getDrawables(state: IState): IDrawable[] {
    const points = state.points.map((point) => {
        const thickness = isIntersecting(point, state.mousePosition, RADIUS) ? 5 : 1;
        return createCircle(point, RADIUS, thickness, IColor.Red);
    });

    let lines = [];
    const entities = [];
    if (state.points.length === 4) {
        lines = state.points.map((point, i) => createLine(point, state.points[(i + 1) % 4], IColor.Blue));

        const massCenter = getParallelogramMassCenter(state.points);
        const area = getParallelogramArea(state.points);
        const circleRadius = getCircleRadiusByArea(area);
        entities.push(createCircle(massCenter, circleRadius, 1, IColor.Yellow));
        entities.push(createText(
            {x: 10, y: 20},
            `Parallelogram area == circle area == ${area}`,
        ));
    }

    const pointLabels = createPointLabels(state.points);

    return [...points, ...lines, ...pointLabels, ...entities];
}

/**
 * Makes graphics beautiful on retina displays.
 * Taken from https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
 */
function setupCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const scale = window.devicePixelRatio;
    canvas.width = width * scale;
    canvas.height = height * scale;

    ctx.scale(scale, scale);
}

function registerCanvasListeners(canvas: HTMLCanvasElement, state: IState) {
    canvas.addEventListener("mousedown", handleClick(canvas, state));
    canvas.addEventListener("mousemove", handleMove(canvas, state));

    canvas.addEventListener("mouseup", handleUp(state));
}

main();
