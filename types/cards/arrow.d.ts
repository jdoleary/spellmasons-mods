import { EffectState, ICard, Spell } from './index';
import Underworld from '../Underworld';
export declare const arrowCardId = "Arrow";
declare const spell: Spell;
export declare function arrowEffect(multiShotCount: number, collideFnKey: string, piercesRemaining?: number, bouncesRemaining?: number): (state: EffectState, card: ICard, quantity: number, underworld: Underworld, prediction: boolean, outOfRange?: boolean) => Promise<EffectState>;
export default spell;
