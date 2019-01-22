import {
    IDrawable,
    IPoint,
    IColor,
} from "./types";

import {
    RADIUS,
} from "./constants";

import createText from "./shapes/text";

export function getEventCoordinates(
    event: MouseEvent,
    canvas: HTMLCanvasElement,
): IPoint {
    const realEvent = event as MouseEvent;
    const rect = canvas.getBoundingClientRect();
    return {x: realEvent.clientX - rect.left, y: realEvent.clientY - rect.top};
}

export function isIntersecting(p1: IPoint, p2: IPoint, threshold: number): boolean {
    if (!p1 || !p2) {
        return false;
    }
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const distsq = dx * dx + dy * dy;
    const rsq = threshold * threshold;

    return distsq < rsq;
}

export function createPointLabels(points: IPoint[]): IDrawable[] {
    return points.map((point) => createText(
        {x: point.x + RADIUS + 5, y: point.y},
        `[${Math.round(point.x)},${Math.round(point.y)}]`,
    ));
}

export function calculateFourthPoint(v: IPoint[]): IPoint {
    if (v.length !== 3) {
        throw new Error("Should be 3 points");
    }

    const x = v[0].x + v[2].x - v[1].x;
    const y = v[0].y + v[2].y - v[1].y;

    return {x, y};
}

export function getParallelogramMassCenter(p: IPoint[]): IPoint {
    const a = p[0];
    const b = p[2];
    return {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2};
}

export function getParallelogramArea(p: IPoint[]) {
    const a = p[0];
    const b = p[1];
    const c = p[2];
    return Math.abs(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
}

export function getCircleRadiusByArea(area: number) {
    return Math.sqrt(area / Math.PI);
}
