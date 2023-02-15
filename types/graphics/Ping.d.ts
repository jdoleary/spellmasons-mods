import type * as PIXI from 'pixi.js';
import type { Vec2 } from '../jmath/Vec';
interface DisappearingSpriteInsructions {
    coords: Vec2;
    color?: number;
    container?: PIXI.Container;
    style?: Partial<PIXI.ITextStyle>;
    keepWithinCameraBounds?: boolean;
}
export default function pingSprite({ coords, color, container, keepWithinCameraBounds }: DisappearingSpriteInsructions): Promise<void>;
export {};
