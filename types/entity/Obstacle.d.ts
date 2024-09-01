import { Vec2 } from '../jmath/Vec';
import { Material } from '../Conway';
import { Polygon2 } from '../jmath/Polygon2';
import type Underworld from '../Underworld';
import { HasSpace } from './Type';
import { IUnit } from './Unit';
export interface IObstacle {
    x: number;
    y: number;
    bounds: Polygon2;
    material: Material;
}
export declare function coordToPoly(coord: Vec2): Polygon2;
export declare function findSafeFallInPoint(currentPosition: Vec2, nextPosition: Vec2, underworld: Underworld): {
    safeFallInPosition: Vec2;
    hitLava: boolean;
};
export declare function isCoordInLiquid(coord: Vec2, underworld: Underworld): Polygon2 | undefined;
export declare function tryFallInOutOfLiquid(entity: HasSpace, underworld: Underworld, prediction: boolean, sourceUnit?: IUnit): void;
