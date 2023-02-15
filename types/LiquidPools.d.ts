import { Material } from "./Conway";
import * as Vec from './jmath/Vec';
declare const _default: {
    width: number;
    contents: Material[];
}[];
export default _default;
interface Matrix {
    width: number;
    contents: number[];
}
export declare function surround(matrixContents: number[], width: number): Matrix;
export declare function matrixToReadable(matrix: number[], width: number): string;
export declare function stampMatricies(source: any[], sourceWidth: number, stamp: any[], stampWidth: number, startStampPosition: Vec.Vec2): void;
interface Stamp {
    start: Vec.Vec2;
    end: Vec.Vec2;
}
export declare function doStampsOverlap(s1: Stamp, s2: Stamp): boolean;
