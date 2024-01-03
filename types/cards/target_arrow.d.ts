import { Spell } from './index';
import { Vec2 } from '../jmath/Vec';
import Underworld from '../Underworld';
export declare const targetArrowCardId = "Target Arrow";
declare const spell: Spell;
export default spell;
export declare function findArrowCollisions(casterPositionAtTimeOfCast: Vec2, casterId: number, target: Vec2, prediction: boolean, underworld: Underworld): Vec2[];
