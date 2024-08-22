type WithKey = {
    key: string;
};
export declare function presentRunes(allRunes: WithKey[], numOfRunesNeeded: number, startIndex: number, lockedRunes: {
    key: string;
    index: number;
}[]): string[];
export declare function incrementPresentedRunesIndex(startIndex: number, incrementBy: number, allRunes: WithKey[], lockedRunes: {
    key: string;
    index: number;
}[]): number;
export {};
