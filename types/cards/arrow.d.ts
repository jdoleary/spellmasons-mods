import { EffectState, ICard, Spell } from './index';
import { LineSegment } from '../jmath/lineSegment';
import { Vec2 } from '../jmath/Vec';
import Underworld from '../Underworld';
export declare const arrowCardId = "Arrow";
declare const spell: Spell;
export declare function arrowEffect(multiShotCount: number, collideFnKey: string, doesPierce?: boolean): (state: EffectState, card: ICard, quantity: number, underworld: Underworld, prediction: boolean, outOfRange?: boolean) => Promise<EffectState>;
export default spell;
export declare function findArrowPath(casterPositionAtTimeOfCast: Vec2, target: Vec2, underworld: Underworld): LineSegment | undefined;
