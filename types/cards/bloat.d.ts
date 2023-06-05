import { Spell } from './index';
import type Underworld from '../Underworld';
import { Vec2 } from '../jmath/Vec';
declare const spell: Spell;
export declare function explode(location: Vec2, radius: number, damage: number, prediction: boolean, underworld: Underworld): void;
export default spell;
