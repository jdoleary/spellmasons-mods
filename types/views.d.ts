import { Overworld } from './Overworld';
import { View } from './View';
import Underworld from './Underworld';
export declare function clearLastNonMenuView(): void;
export declare function toggleMenu(): void;
export declare function setView(v: View): void;
export declare function addOverworldEventListeners(overworld: Overworld): (() => void) | undefined;
export declare function chooseBookmark(bookmark: string, forceActive?: true | undefined, underworld?: Underworld): void;
