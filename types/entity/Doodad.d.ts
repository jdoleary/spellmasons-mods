import { HasSpace } from "./Type";
import * as Image from '../graphics/Image';
import Underworld from "../Underworld";
import { Vec2 } from "../jmath/Vec";
export declare function isDoodad(maybeDoodad: any): maybeDoodad is IDoodad;
export type IDoodad = HasSpace & {
    name: string;
    type: 'doodad';
    imagePath: string;
    image?: Image.IImageAnimated;
    real?: IDoodad;
};
export declare function create({ pos, source }: {
    pos: Vec2;
    source: IDoodadSource;
}, underworld: Underworld, prediction: boolean): IDoodad;
export declare function copyForPredictionDoodad(d: IDoodad): IDoodad;
interface IDoodadSource {
    name: string;
    imagePath: string;
}
export declare const DOODAD_ROCK_NAME = "rock";
export declare const doodads: IDoodadSource[];
export type IDoodadSerialized = Omit<IDoodad, "image" | "real"> & {
    image?: Image.IImageAnimatedSerialized;
};
export declare function serialize(p: IDoodad): IDoodadSerialized;
export declare function load(doodad: IDoodadSerialized, underworld: Underworld, prediction: boolean): IDoodad | undefined;
export {};
