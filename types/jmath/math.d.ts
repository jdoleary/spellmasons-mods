import { Vec2 } from './Vec';
export declare function lerp(start: number, end: number, time: number, goBeyondEnd?: boolean): number;
export declare function lerpSegmented(start: number, end: number, time: number, i: number, length: number): number;
export declare function similarTriangles(X: number, Y: number, D: number, d: number): Vec2;
export declare function getCoordsAtDistanceTowardsTarget(start: Vec2, target: Vec2, travelDist: number, allowMoveBeyondTarget?: boolean): Vec2;
export declare function distance(coords1: Vec2, coords2: Vec2): number;
export declare function sortCosestTo(point: Vec2): (a: Vec2, b: Vec2) => number;
export declare function getPosAtAngleAndDistance(origin: Vec2, radians: number, distance: number): Vec2;
export declare function honeycombGenerator(radius: number, start: Vec2, loopLimit: number): Generator<Vec2>;
export declare function rotateMatrix(array: any[], width: number): {
    contents: any[];
    width: number;
};
