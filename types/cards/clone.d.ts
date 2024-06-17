import { EffectFn, Spell } from './index';
import { IImageAnimated } from '../graphics/Image';
export declare const clone_id = "clone";
declare const spell: Spell;
export declare function cloneEffect(addClonesToTargetArray: boolean): EffectFn;
export declare function animateMitosis(image?: IImageAnimated): Promise<void>;
export default spell;
