import {
    IColor,
    IDrawable,
    IPoint,
} from "../types";

export default function(position: IPoint, text: string): IDrawable {
    const {x, y} = position;

    return {
        draw(ctx) {
            ctx.font = "12px Arial";
            ctx.fillText(text, x, y);
        },
    };
}
