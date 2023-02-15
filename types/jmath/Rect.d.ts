import { Vec2 } from "./Vec";
export interface Rect {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export declare function addMarginToRect(rect: Rect, margin: number): Rect;
export declare function isWithinRect(point: Vec2, rect: Rect): boolean;
