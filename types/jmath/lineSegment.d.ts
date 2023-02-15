import * as Vec from "./Vec";
export interface LineSegment {
    p1: Vec.Vec2;
    p2: Vec.Vec2;
}
export declare function equal(line1: LineSegment, line2: LineSegment): boolean;
export declare function toString(line: LineSegment): string;
declare function slope(line: LineSegment): number | undefined;
interface LineInStandardForm {
    a: number;
    x: number;
    b: number;
    y: number;
    c: number;
}
export declare function toStandardForm(line: LineSegment): LineInStandardForm | undefined;
declare function intersectionOfLines(line: LineInStandardForm, line2: LineInStandardForm): Vec.Vec2;
declare function findWherePointIntersectLineAtRightAngle(point: Vec.Vec2, line: LineInStandardForm): Vec.Vec2;
export declare function findWherePointIntersectLineSegmentAtRightAngle(point: Vec.Vec2, line: LineSegment): Vec.Vec2 | undefined;
export declare function getCenterPoint(ls: LineSegment): Vec.Vec2;
export declare function isPointOnLineSegment(point: Vec.Vec2, lineSegment: LineSegment): boolean;
export declare function isOnOutside(line: LineSegment, c: Vec.Vec2): boolean;
interface ParametricRelation {
    p: Vec.Vec2;
    r: Vec.Vec2;
    q: Vec.Vec2;
    s: Vec.Vec2;
    qMinusP: Vec.Vec2;
    rCrossS: number;
    isCollinear: boolean;
    pointInSameDirection: boolean;
    isOverlapping: boolean;
    l2p1Insidel1?: boolean;
    l2p2Insidel1?: boolean;
    l2FullyCoversl1?: boolean;
}
export declare function getParametricRelation(l1: LineSegment, l2: LineSegment): ParametricRelation;
export declare function getRelation(l1: LineSegment, l2: LineSegment): {
    isCollinear: boolean;
    isOverlapping: boolean;
    pointInSameDirection: boolean;
};
export declare function isCollinearAndPointInSameDirection(l1: LineSegment, l2: LineSegment): boolean;
export declare function isCollinearAndOverlapping(l1: LineSegment, l2: LineSegment): boolean;
export declare function closestLineSegmentIntersectionWithLine(l1: LineSegment, otherLines: LineSegment[]): {
    intersection: Vec.Vec2;
    lineSegment: LineSegment;
} | undefined;
export declare function closestLineSegmentIntersection(l1: LineSegment, otherLines: LineSegment[]): Vec.Vec2 | undefined;
export declare function lineSegmentIntersection(l1: LineSegment, l2: LineSegment): Vec.Vec2 | undefined;
export declare const testables: {
    slope: typeof slope;
    toStandardForm: typeof toStandardForm;
    findWherePointIntersectLineAtRightAngle: typeof findWherePointIntersectLineAtRightAngle;
    intersectionOfLines: typeof intersectionOfLines;
};
export {};
