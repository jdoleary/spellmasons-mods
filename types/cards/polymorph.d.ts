import { Spell } from './index';
import { UnitSource } from '../entity/units';
import Underworld from '../Underworld';
export declare const polymorphId = "Polymorph";
declare const spell: Spell;
export declare function getPossibleUnitPolymorphs(unitSourceId: string, underworld?: Underworld): UnitSource[];
export declare function getPolymorphProbabilityFromBudget(budget1?: number, budget2?: number): number;
export default spell;
