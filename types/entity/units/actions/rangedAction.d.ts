import * as Unit from '../../Unit';
import Underworld from '../../../Underworld';
export declare function getBestRangedLOSTarget(unit: Unit.IUnit, underworld: Underworld, closest?: boolean): Unit.IUnit[];
export declare function rangedLOSMovement(unit: Unit.IUnit, underworld: Underworld): Promise<void>;
