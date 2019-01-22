import {
    getEventCoordinates,
    isIntersecting,
    calculateFourthPoint,
} from "./utils";

import {
    IState,
} from "./types";

import {
    RADIUS,
} from "./constants";

export const handleClick = (
    canvas: HTMLCanvasElement, state: IState,
) => (event: MouseEvent) => {
    event.preventDefault();

    const draggingIndex = state.points.findIndex((point) => {
        return isIntersecting(point, state.mousePosition, RADIUS);
    });

    if (draggingIndex > -1) {
        state.dragging = draggingIndex;
    } else {
        state.dragging = null;

        if (state.points.length < 3) {
            state.points.push(getEventCoordinates(event, canvas));
        }

        if (state.points.length === 3) {
            state.points.push(calculateFourthPoint(state.points));
        }
    }
};

export const handleMove = (
    canvas: HTMLCanvasElement, state: IState,
) => (event: MouseEvent) => {
    event.preventDefault();
    state.mousePosition = getEventCoordinates(event, canvas);

    const draggingIdx = state.dragging;
    if (draggingIdx !== null) {
        state.points[draggingIdx] = state.mousePosition;

        if (state.points.length === 4) {
            const newCoordinates = calculateFourthPoint([
                state.points[draggingIdx],
                state.points[(draggingIdx + 3) % 4],
                state.points[(draggingIdx + 2) % 4],
            ]);
            state.points[(draggingIdx + 1) % 4] = newCoordinates;
        }
    }
};

export const handleUp = (state: IState) => (event: MouseEvent) => {
    event.preventDefault();
    state.dragging = null;
};
