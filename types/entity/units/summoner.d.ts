import * as Unit from '../Unit';
import { UnitSource } from './index';
import Underworld from '../../Underworld';
export declare const SUMMONER_ID = "summoner";
declare const unit: UnitSource;
export declare function summonerAction(unit: Unit.IUnit, ableToSummon: boolean, underworld: Underworld, { closeUnit, farUnit }: {
    closeUnit: UnitSource | undefined;
    farUnit: UnitSource | undefined;
}, baseNumberOfSummons: number): Promise<void>;
export declare function summonerGetUnitAttackTargets(unit: Unit.IUnit, underworld: Underworld): Unit.IUnit[];
export default unit;
