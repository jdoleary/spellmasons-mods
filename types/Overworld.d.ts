import Underworld from "./Underworld";
import { Pie } from './types/commonTypes';
export interface Overworld {
    pie: Pie;
    clients: string[];
    underworld?: Underworld;
}
export default function makeOverworld(pie: Pie): Overworld;
export declare function ensureAllClientsHaveAssociatedPlayers(overworld: Overworld, clients: string[], names: string[], defaultLobbyReady?: boolean): void;
export declare function recalculateGameDifficulty(underworld: Underworld): void;
