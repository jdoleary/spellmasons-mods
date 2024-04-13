import Underworld from "../Underworld";
import * as Unit from '../entity/Unit';
import { EffectState } from "../cards";
export declare const healSfx = "heal";
export declare function healUnits(units: Unit.IUnit[], amount: number, sourceUnit: Unit.IUnit | undefined, underworld: Underworld, prediction: boolean, state?: EffectState): Promise<EffectState | undefined>;
export declare function healUnit(unit: Unit.IUnit, amount: number, sourceUnit: Unit.IUnit | undefined, underworld: Underworld, prediction: boolean, state?: EffectState): Promise<EffectState | undefined>;
export declare function healManaUnits(units: Unit.IUnit[], amount: number, sourceUnit: Unit.IUnit | undefined, underworld: Underworld, prediction: boolean, state?: EffectState): Promise<EffectState | undefined>;
export declare function healManaUnit(unit: Unit.IUnit, amount: number, sourceUnit: Unit.IUnit | undefined, underworld: Underworld, prediction: boolean, state?: EffectState): Promise<EffectState | undefined>;
export declare function oneOffHealAnimation(imageHaver: any, asMana?: boolean): Promise<void>;
