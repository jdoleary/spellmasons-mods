import { EffectState, ICard, Spell } from './index';
import Underworld from '../Underworld';
export declare const slashCardId = "Slash";
declare const spell: Spell;
export declare function slashEffect(state: EffectState, card: ICard, quantity: number, underworld: Underworld, prediction: boolean, damage: number, scale: number): Promise<EffectState>;
export default spell;
