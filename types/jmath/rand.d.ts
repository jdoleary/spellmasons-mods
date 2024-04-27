import type seedrandom from 'seedrandom';
import { IPlayer } from '../entity/Player';
import Underworld from '../Underworld';
export interface prng {
    (): number;
    double(): number;
    int32(): number;
    quick(): number;
    state(): seedrandom.State;
}
export interface SeedrandomState {
    i: number;
    j: number;
    S: number[];
}
export declare function randSign(seedrandomInstance: prng): number;
export declare function randBool(seedrandomInstance: prng): boolean;
export declare function randInt(minInclusive: number, maxInclusive: number, seedrandomInstance?: prng): number;
export declare function randFloat(minInclusive: number, maxExclusive: number, seedrandomInstance?: prng): number;
interface objectWithProbability {
    probability: number;
}
export declare function _chooseObjectWithProbability<T extends objectWithProbability>(roll: number, source: T[]): T | undefined;
export declare function chooseOneOfSeeded<T>(arr: T[], seedRandomInstance: prng): T | undefined;
export declare function chooseOneOf<T>(arr?: T[]): T | undefined;
export declare function chooseObjectWithProbability<T extends objectWithProbability>(source: T[], seedRandomInstance: prng): T | undefined;
export declare function getUniqueSeedString(underworld: Underworld, player?: IPlayer): string;
export {};
