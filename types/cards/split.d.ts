import { Spell } from './index';
import * as Unit from '../entity/Unit';
import { Vec2 } from '../jmath/Vec';
import Underworld from '../Underworld';
export declare const splitId = "split";
export declare function changeStatWithCap(unit: Unit.IUnit, statKey: 'health' | 'healthMax' | 'mana' | 'manaMax' | 'manaPerTurn' | 'manaCostToCast' | 'stamina' | 'staminaMax' | 'moveSpeed' | 'damage' | 'attackRange', multiplier: number): void;
declare const spell: Spell;
export default spell;
export declare function doSplit(target: Vec2 | undefined, underworld: Underworld, quantity: number, prediction: boolean): Unit.IUnit | undefined;
