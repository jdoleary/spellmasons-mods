import { Vec2 } from "./Vec";
export declare function oneDimentionIndexToVec2(index: number, width: number): Vec2;
export declare function vec2ToOneDimentionIndexPreventWrap(pos: Vec2, width: number): number;
export declare function vec2ToOneDimentionIndex(pos: Vec2, width: number): number;
export declare function getElementAtIndexLooped<T>(array: T[], index: number): T | undefined;
