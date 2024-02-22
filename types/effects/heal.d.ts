import Underworld from "../Underworld";
import * as Unit from '../entity/Unit';
import { EffectState } from "../cards";
export declare function healUnits(units: Unit.IUnit[], amount: number, underworld: Underworld, prediction: boolean, state?: EffectState, useFx?: boolean): Promise<EffectState | undefined>;
export declare function healUnit(unit: Unit.IUnit, amount: number, underworld: Underworld, prediction: boolean, state?: EffectState, useFx?: boolean): Promise<EffectState | undefined>;
export declare function healManaUnits(units: Unit.IUnit[], amount: number, underworld: Underworld, prediction: boolean, state?: EffectState, useFx?: boolean): Promise<EffectState | undefined>;
export declare function healManaUnit(unit: Unit.IUnit, amount: number, underworld: Underworld, prediction: boolean, state?: EffectState, useFx?: boolean): Promise<EffectState | undefined>;
