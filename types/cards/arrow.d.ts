import { Spell } from './index';
import { LineSegment } from '../jmath/lineSegment';
import { Vec2 } from '../jmath/Vec';
import Underworld from '../Underworld';
export declare const arrowCardId = "Arrow";
declare const spell: Spell;
export default spell;
export declare function findArrowPath(casterPositionAtTimeOfCast: Vec2, target: Vec2, underworld: Underworld): LineSegment | undefined;
export declare function findArrowCollisions(casterPositionAtTimeOfCast: Vec2, casterId: number, target: Vec2, prediction: boolean, underworld: Underworld): Vec2[];
