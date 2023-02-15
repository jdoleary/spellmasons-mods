import Underworld from "./Underworld";
export declare enum Material {
    EMPTY = 0,
    LIQUID = 1,
    GROUND = 2,
    WALL = 3,
    SEMIWALL = 4
}
export declare function getNeighbors(tileIndex: number, tiles: Material[], widthOf2DArray: number): (Material | undefined)[];
export declare function conway(tiles: Material[], widthOf2DArray: number, underworld: Underworld): void;
export declare function getNeighborIndices(tileIndex: number, widthOf2DArray: number): (number | undefined)[];
