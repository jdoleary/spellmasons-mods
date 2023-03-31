import { Spell } from './index';
import { Vec2 } from '../jmath/Vec';
declare const spell: Spell;
export declare function animateTargetSimilar(circles: {
    pos: Vec2;
    newTargets: Vec2[];
}[]): Promise<void>;
export default spell;
