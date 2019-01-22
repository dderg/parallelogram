export interface IDrawable {
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export enum IColor {
  Blue = "blue",
  Yellow = "yellow",
  Red = "red",
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IState {
    points: IPoint[];
    mousePosition?: IPoint;
    dragging?: number;
}
