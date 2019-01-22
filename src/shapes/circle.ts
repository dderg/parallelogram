import {
    IColor,
    IDrawable,
    IPoint,
} from "../types";

export default function(
    position: IPoint,
    radius: number,
    thickness: number,
    color: IColor,
): IDrawable {
    const {x, y} = position;

    return {
        draw(ctx) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.lineWidth = thickness;
            ctx.stroke();
        },
    };
}
