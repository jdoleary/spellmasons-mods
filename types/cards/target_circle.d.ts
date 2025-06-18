import { Spell } from './index';
import { Vec2 } from '../jmath/Vec';
import Underworld from '../Underworld';
import { HasSpace } from '../entity/Type';
interface Circle {
    pos: Vec2;
    radius: number;
}
declare const spell: Spell;
export declare function animateTargetCircle(circles: Circle[], underworld: Underworld, prediction: boolean, omitTargets?: HasSpace[]): Promise<void>;
export default spell;
