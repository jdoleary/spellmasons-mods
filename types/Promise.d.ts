export declare function raceTimeout(ms: number, message: string, promise: Promise<any>, options?: {
    skipSpyPromise?: boolean;
}): Promise<any>;
export declare function reportIfTakingTooLong(reportAfterMS: number, message: string, promise: Promise<any>): Promise<any>;
