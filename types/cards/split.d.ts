import { Spell } from './index';
import * as Unit from '../entity/Unit';
import * as Pickup from '../entity/Pickup';
import { Vec2 } from '../jmath/Vec';
import Underworld from '../Underworld';
export declare const splitId = "split";
declare const spell: Spell;
export default spell;
export declare function doSplit(target: Vec2 | undefined, summoner: Unit.IUnit, underworld: Underworld, quantity: number, prediction: boolean): Unit.IUnit | Pickup.IPickup | undefined;
