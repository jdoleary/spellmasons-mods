import PieClient from "@websocketpie/client";
import { IHostApp } from "./network/networkUtil";
import Underworld from "./Underworld";
export interface Overworld {
    pie: PieClient | IHostApp;
    clients: string[];
    underworld?: Underworld;
}
export default function makeOverworld(pie: PieClient | IHostApp): Overworld;
export declare function ensureAllClientsHaveAssociatedPlayers(overworld: Overworld, clients: string[]): void;
export declare function recalculateGameDifficulty(underworld: Underworld): void;
