import type { IUnit } from '../entity/Unit';
import { Spell } from './index';
import Underworld from '../Underworld';
import { IPlayer } from '../entity/Player';
export declare const contaminate_id = "contaminate";
declare const spell: Spell;
export default spell;
export declare function contaminate(casterPlayer: IPlayer | undefined, unit: IUnit, quantity: number, radiusBoost: number, underworld: Underworld, prediction: boolean): Promise<void>;
