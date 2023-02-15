import * as Unit from '../Unit';
import { prng } from '../../jmath/rand';
import { UnitSource } from './index';
import Underworld from '../../Underworld';
import { Vec2 } from '../../jmath/Vec';
export declare const SUMMONER_ID = "summoner";
declare const unit: UnitSource;
export declare function summonerAction(unit: Unit.IUnit, ableToSummon: boolean, underworld: Underworld, { closeUnit, farUnit }: {
    closeUnit: UnitSource | undefined;
    farUnit: UnitSource | undefined;
}, baseNumberOfSummons: number): Promise<void>;
export declare function summonerGetUnitAttackTargets(unit: Unit.IUnit, underworld: Underworld): Unit.IUnit[];
export declare function findRandomGroundLocation(underworld: Underworld, summoner: Unit.IUnit, seed: prng): Vec2 | undefined;
export default unit;
