export declare function enableRemoteLogging(): void;
interface EventGroupMessage {
    seed: string;
    gameName: string;
    startTime?: number;
    serverRegion?: string;
    events: Event[];
}
interface Event {
    time: number;
    message: string;
}
export declare function sendEventToServerHub(eventG: EventGroupMessage): void;
declare enum LogLevel {
    DEBUG = 0,
    TRACE = 1,
    LOG = 2,
    WARN = 3,
    ERROR = 4
}
declare enum RUNNER {
    BROWSER = 0,
    SERVER = 1
}
declare enum ENV {
    DEV = 0,
    STAGING = 1,
    PROD = 2,
    UNKNOWN = 3
}
export interface Log {
    m: string;
    v: string;
    r: RUNNER;
    l: LogLevel;
    d: number;
    e: ENV;
}
export {};
