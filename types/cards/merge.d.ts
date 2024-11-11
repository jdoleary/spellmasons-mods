import { EffectState, Spell } from './index';
import * as Unit from '../entity/Unit';
import * as Pickup from '../entity/Pickup';
import { IImageAnimated } from '../graphics/Image';
import Underworld from '../Underworld';
import { Vec2 } from '../jmath/Vec';
export declare const merge_id = "merge";
declare const spell: Spell;
export declare function mergeUnits(target: Unit.IUnit, unitsToMerge: Unit.IUnit[], underworld: Underworld, prediction: boolean, state?: EffectState): void;
export declare function mergePickups(target: Pickup.IPickup, pickupsToMerge: Pickup.IPickup[], underworld: Underworld, prediction: boolean, state?: EffectState): void;
export declare function animateMerge(image: IImageAnimated | undefined, target: Vec2): Promise<any>;
export default spell;
