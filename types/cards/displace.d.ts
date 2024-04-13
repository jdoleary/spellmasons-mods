import { Spell } from './index';
import type { Vec2 } from '../jmath/Vec';
import Underworld from '../Underworld';
import { prng } from '../jmath/rand';
export declare function findRandomDisplaceLocation(underworld: Underworld, radius: number, seed: prng, prediction: boolean): Vec2 | undefined;
declare const spell: Spell;
export default spell;
