import { Vec2 } from '../jmath/Vec';
import { Spell } from './index';
import type { ForceMove } from '../jmath/moveWithCollision';
import Underworld from '../Underworld';
import { HasSpace } from '../entity/Type';
export declare const pushId = "push";
export declare const velocityStartMagnitude = 10;
declare const spell: Spell;
interface forcePushArgs {
    pushedObject: HasSpace;
    awayFrom: Vec2;
    velocityStartMagnitude: number;
    canCreateSecondOrderPushes: boolean;
    resolve: () => void;
}
export declare function makeForcePush(args: forcePushArgs, underworld: Underworld, prediction: boolean): ForceMove;
export declare function forcePush(pushedObject: HasSpace, awayFrom: Vec2, magnitude: number, underworld: Underworld, prediction: boolean): Promise<void>;
export default spell;
