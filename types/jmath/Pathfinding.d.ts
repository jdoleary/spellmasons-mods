import { Vec2 } from './Vec';
import { Polygon2, Polygon2LineSegment } from "./Polygon2";
export declare function findPolygonsThatVec2IsInsideOf(point: Vec2, testPolygons: Polygon2[]): Polygon2[];
export declare function findPath(startPoint: Vec2, target: Vec2, pathingLineSegments: Polygon2LineSegment[]): Vec2[];
export declare function removeBetweenIndexAtoB(array: any[], indexA: number, indexB: number): any[];
export declare function calculateDistanceOfVec2Array(points: Vec2[]): number;
export declare function pointsEveryXDistanceAlongPath(startPoint: Vec2, path: Vec2[], distanceOfIncrements: number, alreadyUsedDistance?: number): Vec2[];
