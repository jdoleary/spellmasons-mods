import { Overworld } from "./Overworld";
import Underworld from "./Underworld";
declare type moddedEntity = {
    modName?: string;
};
export declare function isModActive(entity: moddedEntity, underworld: Underworld): boolean;
export default function registerAllMods(overworld: Overworld): void;
export {};
