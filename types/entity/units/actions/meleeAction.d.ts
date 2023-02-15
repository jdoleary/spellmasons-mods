import type { Vec2 } from '../../../jmath/Vec';
import * as Unit from '../../Unit';
import Underworld from '../../../Underworld';
export declare function meleeAction(unit: Unit.IUnit, attackTargets: Unit.IUnit[] | undefined, underworld: Underworld, canAttackTarget: boolean, attackCB: (attackTarget: Unit.IUnit) => Promise<void>): Promise<void>;
export declare function meleeTryAttackClosestEnemy(unit: Unit.IUnit, attackTarget: Unit.IUnit, precalculatedCanAttack: boolean, goAheadAttackCB: () => Promise<void>): Promise<void>;
export declare function withinMeleeRange(unit: Unit.IUnit, target: Vec2): boolean;
