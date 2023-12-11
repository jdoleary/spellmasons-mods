import type { IUnit } from '../entity/Unit';
import { Spell } from './index';
import * as Unit from '../entity/Unit';
export declare const id = "Blood Curse";
export declare function hasBloodCurse(unit: IUnit): boolean;
export declare function updateTooltip(unit: Unit.IUnit): void;
declare const spell: Spell;
export default spell;
