import { Overworld } from "./Overworld";
type moddedEntity = {
    modName?: string;
};
export declare function isModActive(entity: moddedEntity, underworld: {
    activeMods: string[];
}): boolean;
export default function registerAllMods(overworld: Overworld): void;
export {};
