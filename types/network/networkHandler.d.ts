import type { OnDataArgs } from '@websocketpie/client';
import { MESSAGE_TYPES } from '../types/MessageTypes';
import { IUnderworldSerialized } from '../Underworld';
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
    numberOfHotseatPlayers: number;
}
