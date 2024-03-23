import { Spell } from './index';
import { Vec2 } from '../jmath/Vec';
export declare const targetInjuredId = "Target Injured";
declare const spell: Spell;
export declare function animateTargetInjured(newTargets: Vec2[]): Promise<void>;
export default spell;
