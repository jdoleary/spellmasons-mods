export interface Subsprite {
    imageName: string;
    alpha: number;
    anchor: {
        x: number;
        y: number;
    };
    scale: {
        x: number;
        y: number;
    };
}
export interface ISubsprites {
    [id: string]: Subsprite;
}
declare const Subsprites: ISubsprites;
export default Subsprites;
