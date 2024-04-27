/// <reference types="lodash" />
export declare const sfx: {
    [key: string]: string[];
};
export declare const playThrottledEndTurnSFX: import("lodash").DebouncedFunc<() => void>;
export declare function playMusicIfNotAlreadyPlaying(): void;
export declare function playNextSong(): Promise<void>;
export declare function playSFXKey(key?: string): void;
export declare function testAllSFXKey(key?: string): void;
export declare function playSFX(path?: string): void;
export declare function setupAudio(): void;
