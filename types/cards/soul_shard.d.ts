import * as Unit from '../entity/Unit';
import type Underworld from '../Underworld';
import { Spell } from './index';
export declare const soulShardId = "Soul Shard";
declare const spell: Spell;
export declare function getAllShardBearers(unit: Unit.IUnit, underworld: Underworld, prediction: boolean): Unit.IUnit[];
export default spell;
