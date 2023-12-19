import type { OnDataArgs } from '@websocketpie/client';
import { MESSAGE_TYPES } from '../types/MessageTypes';
import { IUnderworldSerialized, turn_phase } from '../Underworld';
import * as Player from '../entity/Player';
import * as Unit from '../entity/Unit';
import * as Pickup from '../entity/Pickup';
import { Overworld } from '../Overworld';
export declare const NO_LOG_LIST: MESSAGE_TYPES[];
export declare const HANDLE_IMMEDIATELY: MESSAGE_TYPES[];
export declare const elInstructions: HTMLElement | undefined;
export declare function onData(d: OnDataArgs, overworld: Overworld): void;
export declare function processNextInQueueIfReady(overworld: Overworld): void;
export declare function setupNetworkHandlerGlobalFunctions(overworld: Overworld): void;
export interface SaveFile {
    version: string;
    underworld: IUnderworldSerialized;
    phase: turn_phase.PlayerTurns;
    pickups: Pickup.IPickupSerialized[];
    units: Unit.IUnitSerialized[];
    players: Player.IPlayerSerialized[];
    numberOfHotseatPlayers: number;
}
