import SimplePeer from "simple-peer/simplepeer.min.js";
export declare const MessageType: {
    Data: string;
    Rooms: string;
    ClientPresenceChanged: string;
    ServerAssignedData: string;
    Err: string;
    ResolvePromise: string;
    RejectPromise: string;
    JoinRoom: string;
    LeaveRoom: string;
    GetRooms: string;
    GetStats: string;
    ConnectInfo: string;
};
export interface ConnectInfo {
    type: string;
    connected: boolean;
    msg: string;
}
export interface ServerAssignedData {
    type: string;
    clientId: string;
    serverVersion: string;
    hostAppVersion: string;
}
export interface OnDataArgs {
    type: string;
    subType: string;
    fromClient: string;
    payload: any;
    time: number;
}
export interface ClientPresenceChangedArgs {
    type: string;
    clients: string[];
    time: number;
}
export interface Room {
    app: string;
    name: string;
    version: string;
    maxClients?: number;
    togetherTimeoutMs?: number;
    hidden?: boolean;
    password?: string;
}
export interface OnRoomsArgs {
    type: string;
    rooms: Room[];
}
export interface Latency {
    min: number;
    max: number;
    averageDataPoints: number[];
    average: number;
}
export default class PiePeer {
    #private;
    onData?: (x: OnDataArgs) => void;
    onError?: ((x: {
        message: string;
    }) => void);
    onServerAssignedData?: ((x: ServerAssignedData) => void);
    onClientPresenceChanged?: ((c: ClientPresenceChangedArgs) => void);
    onRooms?: ((x: OnRoomsArgs) => void);
    onConnectInfo?: ((c: ConnectInfo) => void);
    onLatency?: (l: Latency) => void;
    useStats: boolean;
    soloMode: boolean;
    isP2PHost?: boolean;
    promiseCBs: {
        joinRoom?: {
            resolve: (x: any) => void;
            reject: (x: any) => void;
        };
    };
    peers: {
        peer: SimplePeer;
        name: string;
        clientId: string;
    }[];
    currentRoomInfo?: Room;
    stats: {
        latency: Latency;
    };
    get clientId(): string;
    set clientId(newId: string);
    reconnectTimeoutId?: ReturnType<typeof setTimeout>;
    heartbeatTimeout?: ReturnType<typeof setTimeout>;
    reconnectAttempts: number;
    cancelNextReconnectAttempt: boolean;
    constructor();
    isConnected(): boolean;
    heartbeat(): void;
    quickConnect(wsUrl: string): Promise<void>;
    connect(wsUrl: string, useStats?: boolean): Promise<void>;
    connectSolo(): Promise<void>;
    onClose: () => void;
    tryReconnect: () => void;
    disconnect(): Promise<void>;
    handleMessage(message: any): void;
    hostBroadcastConnectedPeers(): void;
    makeRoom(roomInfo: Room): void;
    joinRoom(roomInfo: Room, isHosting?: boolean): Promise<Room>;
    leaveRoom(): void;
    getRooms(roomInfo: any): void;
    sendData(payload: any, extras?: any): void;
    sendMessage(message: {
        type: string;
    } & any): void;
    _updateDebugInfo(message?: {
        clients: object[];
    }): void;
}
