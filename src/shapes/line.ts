import {
    IColor,
    IDrawable,
    IPoint,
} from "../types";

export default function(
    p1: IPoint,
    p2: IPoint,
    color: IColor,
): IDrawable {
    const {x: x1, y: y1} = p1;
    const {x: x2, y: y2} = p2;

    return {
        draw(ctx) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        },
    };
}
