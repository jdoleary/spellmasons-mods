import { EffectState, ICard, Spell } from './index';
import { Vec2 } from '../jmath/Vec';
import { HasSpace } from '../entity/Type';
import Underworld from '../Underworld';
export declare const targetSimilarId = "Target Similar";
declare const spell: Spell;
export declare function targetSimilarEffect(numberOfTargets: number): (state: EffectState, card: ICard, quantity: number, underworld: Underworld, prediction: boolean, outOfRange?: boolean) => Promise<EffectState>;
export declare function findSimilar(target: HasSpace, underworld: Underworld, prediction: boolean, potentialTargets?: HasSpace[]): HasSpace[];
export declare function animateTargetSimilar(circles: {
    pos: Vec2;
    newTargets: Vec2[];
}[]): Promise<void>;
export default spell;
