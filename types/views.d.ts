import { Overworld } from './Overworld';
export declare enum View {
    Menu = 0,
    Setup = 1,
    Game = 2,
    Disconnected = 3
}
export declare function clearLastNonMenuView(): void;
export declare function toggleMenu(): void;
export declare function setView(v: View): void;
export declare function addOverworldEventListeners(overworld: Overworld): (() => void) | undefined;
