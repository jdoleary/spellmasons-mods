import * as Unit from './entity/Unit';
import Underworld from './Underworld';
export declare const golemancerId = "Golemancer";
export default function registerGolemancer(): void;
export declare function getLivingAllyGolems(unit: Unit.IUnit, underworld: Underworld, prediction: boolean): Unit.IUnit[];
