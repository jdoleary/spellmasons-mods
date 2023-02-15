import { prng } from "./rand";
export interface Vec2 {
    x: number;
    y: number;
}
export declare function getAngleBetweenVec2s(origin: Vec2, point: Vec2): number;
export declare function getAngleBetweenVec2sYInverted(origin: Vec2, point: Vec2): number;
export declare function multiply(scalar: number, p2: Vec2): Vec2;
export declare function add(p1: Vec2, p2: Vec2): Vec2;
export declare function subtract(p1: Vec2, p2: Vec2): Vec2;
export declare function jitter(pos: Vec2, maxJitter: number, random?: prng): Vec2;
export declare function random(min: number, max: number, random?: prng): Vec2;
export declare function crossproduct(p1: Vec2, p2: Vec2): number;
export declare function dotProduct(p1: Vec2, p2: Vec2): number;
export declare function magnitude(p: Vec2): number;
export declare function equal(p1: Vec2, p2: Vec2): boolean;
export declare function clone(p: Vec2): Vec2;
export declare function round(v: Vec2): Vec2;
export declare function invert(v: Vec2): Vec2;
export declare function average_mean(vs: Vec2[]): Vec2;
export declare function getEndpointOfMagnitudeAlongVector(pos: Vec2, angle: number, magnitude: number): Vec2;
export declare function isBetween(testPoint: Vec2, boundingPoint: Vec2, boundingPoint2: Vec2): boolean;
export declare function clampVector(vector: Vec2, maxMagnitude: number): Vec2;
export declare function isInvalid(vector: Vec2 | undefined): boolean;
