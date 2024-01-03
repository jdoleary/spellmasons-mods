interface syncFunctionReturn<T, U> {
    sync: [T, U][];
    remove: T[];
    skippedRemoval: T[];
    create: U[];
}
export declare function getSyncActions<T, U>(current: T[], syncFrom: U[], findMatch: (a: T, potentialMatches: U[]) => U | undefined, doNotRemove: (a: T) => boolean): syncFunctionReturn<T, U>;
export {};
