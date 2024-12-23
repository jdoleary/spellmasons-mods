import * as PIXI from 'pixi.js';
import { Vec2 } from '../jmath/Vec';
import { View } from '../View';
import { JSpriteAnimated } from './Image';
import Underworld, { Biome } from '../Underworld';
import { IUnit } from '../entity/Unit';
export declare const app: PIXI.Application | undefined;
export declare const containerLiquid: PIXI.Container | undefined;
export declare const containerBoard: PIXI.Container | undefined;
export declare const containerBloodSmear: PIXI.Container | undefined;
export declare const containerPlanningView: PIXI.Container | undefined;
export declare const containerCorpses: PIXI.Container | undefined;
export declare const containerWalls: PIXI.Container | undefined;
export declare const containerRadiusUI: PIXI.Container | undefined;
export declare const containerDoodads: PIXI.Container | undefined;
export declare const containerUnits: PIXI.Container | undefined;
export declare const containerSpells: PIXI.Container | undefined;
export declare const containerProjectiles: PIXI.Container | undefined;
export declare const containerUI: PIXI.Container | undefined;
export declare const containerPlayerThinking: PIXI.Container | undefined;
export declare const containerUIFixed: PIXI.Container | undefined;
export declare const containerFloatingText: PIXI.Container | undefined;
export declare const graphicsBloodSmear: PIXI.Graphics | undefined;
export declare const containerBloodParticles: PIXI.ParticleContainer | undefined;
export declare function cleanBlood(underworld?: Underworld): void;
export declare function cacheBlood(): void;
export declare function setupLiquidFilter(): void;
export declare function cleanUpLiquidFilter(): void;
export declare function resizePixi(): void;
export declare function setAbyssColor(biome: Biome): void;
export declare function withinCameraBounds(position: Vec2, marginHorizontal?: number, marginVertical?: number): Vec2;
export declare function moveCamera(x: number, y: number): void;
export declare function getZoom(): number;
export declare function isCameraAutoFollowing(): boolean;
export declare function cameraAutoFollow(active: boolean): void;
export declare function tryShowRecenterTip(): void;
export declare function getCameraCenterInGameSpace(): Vec2;
export declare function getCamera(): {
    x: number;
    y: number;
    zoom: number;
};
export declare function getMapCenter(underworld: Underworld): Vec2;
export declare function setCamera(pos: Vec2, zoom: number, underworld: Underworld): void;
export declare function setCameraToMapCenter(underworld: Underworld): void;
export declare function startScreenshake(intensity: number, prediction: boolean, falloff?: number): void;
export declare function updateCameraPosition(underworld: Underworld, deltaTime: number): void;
export declare function getNextCameraVelocity(cameraVelocity: Vec2, targetCameraVelocity: Vec2, deltaTime: number): Vec2;
export declare function getNextCameraPosition(cameraPos: Vec2, cameraVelocity: Vec2, zoom: number, deltaTime: number): Vec2;
export declare function updateNameText(nameText?: PIXI.Text, zoom?: number): void;
export declare function setupPixi(): Promise<void>;
export declare function addPixiContainersForView(view: View): void;
export interface PixiSpriteOptions {
    onFrameChange?: (currentFrame: number) => void;
    onComplete?: () => void;
    loop: boolean;
    animationSpeed?: number;
    colorReplace?: {
        colors: [number, number][];
        epsilon: number;
    };
    scale?: number;
}
export declare function getPixiTextureAnimated(imagePath: string): PIXI.Texture<PIXI.Resource>[] | undefined;
export declare function addPixiSpriteAnimated(imagePath: string, parent: PIXI.Container | undefined, options?: PixiSpriteOptions): JSpriteAnimated | undefined;
export declare function addPixiTilingSprite(imagePath: string, parent: PIXI.Container | undefined): PIXI.TilingSprite | undefined;
export declare function addPixiSprite(imagePath: string, parent: PIXI.Container | undefined): PIXI.Sprite | undefined;
export declare function pixiText(text: string, style: Partial<PIXI.ITextStyle>): PIXI.Text | undefined;
export type BloodParticle = {
    x: number;
    y: number;
    dx: number;
    dy: number;
    tick: number;
    scale: number;
    color: number;
};
export declare function startBloodParticleSplatter(underworld: Underworld, damageOrigin: Vec2, target: IUnit, options?: {
    maxRotationOffset: number;
    numberOfParticles: number;
}): void;
export declare function tickParticle(particle: BloodParticle): boolean;
export declare const CLASS_HUD_HIDDEN = "HUD-hidden";
export declare const CLASS_VISIBILITY_ATTENTION_MARKERS = "attention-markers-hidden";
export declare const CLASS_VISIBILITY_HEALTH_BARS = "health-bars-hidden";
export declare function toggleHUD(): void;
