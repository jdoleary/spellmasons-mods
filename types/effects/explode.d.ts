import Underworld from "../Underworld";
import { Vec2 } from "../jmath/Vec";
import { IUnit } from "../entity/Unit";
export declare const baseExplosionRadius = 140;
export declare function explode(location: Vec2, radius: number, damage: number, pushDistance: number, underworld: Underworld, prediction: boolean, colorstart: number, colorEnd: number): IUnit[];
