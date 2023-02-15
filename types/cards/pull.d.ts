import { Vec2 } from '../jmath/Vec';
import { Spell } from './index';
import Underworld from '../Underworld';
import { HasSpace } from '../entity/Type';
export declare const id = "pull";
export declare const velocityStartMagnitude = 10;
declare const spell: Spell;
export declare function pull(pushedObject: HasSpace, towards: Vec2, quantity: number, underworld: Underworld, prediction: boolean): Promise<void>;
export default spell;
