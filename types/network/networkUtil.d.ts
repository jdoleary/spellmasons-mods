import type { LevelData } from '../Underworld';
import { MESSAGE_TYPES } from '../types/MessageTypes';
import Underworld from '../Underworld';
import { Overworld } from '../Overworld';
import type { Room } from '@websocketpie/client';
import { Pie } from '../types/commonTypes';
export interface ClientPresenceChangedArgs {
    type: string;
    clients: string[];
    names?: string[];
    time: number;
}
export declare function onClientPresenceChanged(o: ClientPresenceChangedArgs, overworld: Overworld): void;
export declare function hostGiveClientGameState(clientId: string, underworld: Underworld, level: LevelData | undefined, message_type: MESSAGE_TYPES.INIT_GAME_STATE | MESSAGE_TYPES.LOAD_GAME_STATE): void;
export interface IHostApp {
    sendData(payload: any, extras?: any): void;
    isHostApp: boolean;
    soloMode: boolean;
    currentRoomInfo?: Room;
}
export declare function typeGuardHostApp(x: Pie): x is IHostApp;
export declare function getVersionInequality(clientVersion?: string, serverVersion?: string): 'equal' | 'client behind' | 'server behind' | 'malformed';
