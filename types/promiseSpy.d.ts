type TrackablePromise = Promise<any> & {
    test_label?: string;
    test_ignorePromiseSpy?: boolean;
    test_label_sub?: string;
};
export declare function test_ignorePromiseSpy(prom: TrackablePromise): void;
export declare function test_endCheckPromises(): boolean;
export declare function test_startCheckPromises(label: string): void;
export declare function test_spyPromises(): void;
export {};
