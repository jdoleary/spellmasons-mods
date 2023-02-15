interface Lerpable {
    mutatable: any;
    key: string;
    startVal: number;
    endVal: number;
    startTime: number;
    duration: number;
}
declare function processLerpList(currentTime: number, lerpQueue: Lerpable[]): void;
export declare function lerpLoop(timestamp: number): void;
export declare function addLerpable(object: any, key: string, endVal: number, duration: number): void;
export declare const testable: {
    processLerpList: typeof processLerpList;
};
export {};
