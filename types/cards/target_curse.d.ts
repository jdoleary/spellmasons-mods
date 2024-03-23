import { Spell } from './index';
import { Vec2 } from '../jmath/Vec';
export declare const targetCursedId = "Target Cursed";
declare const spell: Spell;
export declare function animateTargetCursed(newTargets: Vec2[]): Promise<void>;
export default spell;
