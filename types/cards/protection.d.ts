/// <reference types="lodash" />
import { Spell } from './index';
import { Vec2 } from '../jmath/Vec';
export declare const id = "Nullify";
export declare const notifyProtected: import("lodash").DebouncedFunc<(coords: Vec2, prediction: boolean) => void>;
declare const spell: Spell;
export default spell;
