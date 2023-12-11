import { UnitSource } from './index';
import { Faction } from '../../types/commonTypes';
import Underworld from '../../Underworld';
import * as Pickup from '../Pickup';
export declare const bossmasonUnitId = "Deathmason";
declare const unit: UnitSource;
export declare function summonUnitAtPickup(faction: Faction, pickup: Pickup.IPickup, underworld: Underworld): void;
export default unit;
