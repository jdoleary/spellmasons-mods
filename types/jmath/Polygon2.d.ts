import * as LineSegment from "./lineSegment";
import { Vec2 } from "./Vec";
import * as Vec from "./Vec";
export declare function getLoopableIndex(index: number, array: any[]): number;
export declare function getPointNormalVector(point: Vec2, prevPoint: Vec2, nextPoint: Vec2): Vec2;
export declare type Polygon2LineSegment = LineSegment.LineSegment & {
    polygon: Polygon2;
};
export declare type Polygon2 = Vec2[];
export declare function mergeCollinearOverlappingSameDirectionLines(lines: LineSegment.LineSegment[]): LineSegment.LineSegment[];
export declare function splitIntersectingLineSegments(line: LineSegment.LineSegment, lineSegments: LineSegment.LineSegment[]): LineSegment.LineSegment[];
export declare function splitIntersectingPolygon2LineSegments(lineSegments: Polygon2LineSegment[]): Polygon2LineSegment[];
export declare function mergePolygon2s(polygons: Polygon2[]): Polygon2[];
export declare function growOverlappingCollinearLinesInDirectionOfP2(line: LineSegment.LineSegment, walls: LineSegment.LineSegment[]): {
    grownLine: LineSegment.LineSegment;
    removedLines: LineSegment.LineSegment[];
};
export declare function processLineSegment(processingLineSegment: LineSegment.LineSegment, lineSegments: LineSegment.LineSegment[]): Polygon2;
export declare function toLineSegments(poly: Polygon2): LineSegment.LineSegment[];
export declare function toPolygon2LineSegments(polygon: Polygon2): Polygon2LineSegment[];
export declare function isVec2InsidePolygon(point: Vec2, polygon: Polygon2): boolean;
export declare function expandPolygon(polygon: Polygon2, magnitude: number): Polygon2;
export declare function makePolygonIndexIterator(polygon: Polygon2, startIndex?: number): Generator<number, undefined>;
export declare function getPointsFromPolygonStartingAt(polygon: Polygon2, startPoint: Vec2): Vec2[];
export declare function doesVertexBelongToPolygon(p: Vec2, poly: Polygon2): boolean;
export declare function getInsideAnglesOfWall(p: Polygon2LineSegment): {
    start: number;
    end: number;
};
export declare function getInsideAnglesOfPoint(polygon: Polygon2, pointIndex: number): {
    start: number;
    end: number;
};
export declare function doesLineFromPointToTargetProjectAwayFromOwnPolygon(polygon: Polygon2, pointIndex: number, target: Vec2): boolean;
export interface Branch {
    branchAngle: number;
    distance: number;
    intersection: Vec.Vec2;
    branchingLine: LineSegment.LineSegment;
}
