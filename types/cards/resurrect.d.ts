import * as Unit from '../entity/Unit';
import { Spell } from './index';
import { Faction } from '../types/commonTypes';
import type Underworld from '../Underworld';
export declare const resurrect_id = "resurrect";
export declare const thumbnail = "spellIconResurrect2.png";
declare const spell: Spell;
export declare function resurrectWithAnimation(unit: Unit.IUnit, summoner: Unit.IUnit, faction: Faction, underworld: Underworld, prediction: boolean, color?: number): Promise<void>;
export default spell;
