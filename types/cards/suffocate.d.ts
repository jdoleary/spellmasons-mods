import { Spell } from './index';
import * as Unit from '../entity/Unit';
import Underworld from '../Underworld';
export declare const suffocateCardId = "suffocate";
export declare function getSuffocateBuildup(unit: Unit.IUnit): number;
export declare function updateSuffocate(unit: Unit.IUnit, underworld: Underworld, prediction: boolean): boolean;
declare const spell: Spell;
export default spell;
