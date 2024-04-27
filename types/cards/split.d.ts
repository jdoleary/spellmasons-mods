import { Spell } from './index';
import * as Unit from '../entity/Unit';
export declare function changeStatWithCap(unit: Unit.IUnit, statKey: 'health' | 'healthMax' | 'mana' | 'manaMax' | 'manaPerTurn' | 'manaCostToCast' | 'stamina' | 'staminaMax' | 'moveSpeed' | 'damage' | 'attackRange', multiplier: number): void;
declare const spell: Spell;
export default spell;
