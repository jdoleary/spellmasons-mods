import type * as PIXI from 'pixi.js';
import { PixiSpriteOptions } from './PixiUtils';
import type { Vec2 } from "../jmath/Vec";
export interface HasImage {
    image: IImageAnimated;
}
export declare function hasImage(maybe: any): maybe is HasImage;
export type IImageAnimatedSerialized = {
    scaleModifiers?: ScaleModifier[];
    sprite: {
        x: number;
        y: number;
        scale: {
            x: number;
            y: number;
        };
        imagePath: string;
        loop: boolean;
        children: string[];
    };
    mask?: string;
};
export type JSpriteAnimated = PIXI.AnimatedSprite & {
    imagePath: string;
    doRemoveWhenPrimaryAnimationChanges: boolean;
};
interface ScaleModifier {
    id: string;
    x?: number;
    y?: number;
}
export interface IImageAnimated {
    sprite: JSpriteAnimated;
    scaleModifiers?: ScaleModifier[];
    resolver: undefined | (() => void);
    mask?: string;
}
export declare function create(coords: Vec2, spritesheetId: string, parent: PIXI.Container | undefined, pixiSpriteOptions?: PixiSpriteOptions): IImageAnimated | undefined;
export declare function removeScaleModifier(image: IImageAnimated | undefined, id: string, strength: number): void;
export declare function addScaleModifier(image: IImageAnimated | undefined, mod: ScaleModifier, strength: number): void;
export declare function setScaleFromModifiers(image: IImageAnimated | undefined, strength: number): void;
export declare function cleanup(image?: IImageAnimated): void;
export declare function changeSprite(image: IImageAnimated | undefined, imagePath: string, container: PIXI.Container | undefined, resolver: undefined | (() => void), options?: PixiSpriteOptions): JSpriteAnimated | undefined;
export declare function serialize(image: IImageAnimated): IImageAnimatedSerialized;
export declare function load(image: IImageAnimatedSerialized | undefined, parent: PIXI.Container | undefined): IImageAnimated | undefined;
export declare function getAnimationPathFromSprite(sprite: PIXI.Sprite): string;
export declare function getSubspriteImagePaths(image: IImageAnimated): string[];
export declare function syncronize(imageSerialized: IImageAnimatedSerialized, originalImage?: IImageAnimated): IImageAnimated | undefined;
export declare function restoreSubsprites(image: IImageAnimated | undefined, subspriteImageNames: string[]): void;
export declare function removeMask(image: IImageAnimated): void;
export declare function addMask(image: IImageAnimated, path: string): void;
export declare function setPosition(image: IImageAnimated | undefined, pos: Vec2): void;
export declare function addSubSprite(image: IImageAnimated | undefined, imageName: string): PIXI.AnimatedSprite | PIXI.Sprite | undefined;
export declare function removeSubSprite(image: IImageAnimated | undefined, imagePath: string): void;
export declare function show(image?: IImageAnimated): void;
export declare function hide(image?: IImageAnimated): void;
interface OneOffOptions {
    doRemoveWhenPrimaryAnimationChanges?: boolean;
    keyFrame?: number;
    skipSpyPromise?: boolean;
}
export declare function addOneOffAnimation(imageHaver: any, spritePath: string, oneOffOptions?: OneOffOptions, options?: PixiSpriteOptions): Promise<void>;
export {};
