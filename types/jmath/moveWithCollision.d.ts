import { Vec2 } from './Vec';
import { LineSegment } from "./lineSegment";
import Underworld from '../Underworld';
import { HasSpace } from '../entity/Type';
export interface ForceMove {
    pushedObject: HasSpace;
    canCreateSecondOrderPushes: boolean;
    velocity: Vec2;
    velocity_falloff: number;
    timedOut?: boolean;
    alreadyCollided: HasSpace[];
    resolve: () => void;
}
export declare type Circle = {
    radius: number;
} & Vec2;
export declare function isVecIntersectingVecWithCustomRadius(c1: Vec2, c2: Vec2, radius: number): boolean;
export declare function isCircleIntersectingCircle(c1: Circle, c2: Circle): boolean;
export declare function moveAwayFrom(circle: Circle, from: Vec2): void;
export declare function moveAlongVector(startPos: Vec2, normalizedVector: Vec2, distance: number): Vec2;
export declare function normalizedVector(point1: Vec2, point2: Vec2): {
    vector: Vec2 | undefined;
    distance: number;
};
export declare function collideWithLineSegments(circle: Circle, lineSegments: LineSegment[], underworld: Underworld): boolean;
export declare function forceMovePreventForceThroughWall(forceMoveInst: ForceMove, underworld: Underworld): boolean;
export declare function moveWithCollisions(mover: Circle, destination: Vec2, circles: HasSpace[], underworld: Underworld): void;
declare function repelCircles(mover: Circle, originalPosition: Vec2, other: Circle, underworld: Underworld, otherIsFixed?: boolean): void;
declare function repelCircleFromLine(mover: Circle, line: LineSegment, underworld: Underworld): boolean;
export declare const testables: {
    repelCircles: typeof repelCircles;
    repelCircleFromLine: typeof repelCircleFromLine;
};
export {};
