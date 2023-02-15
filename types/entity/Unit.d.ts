import * as Image from '../graphics/Image';
import { PixiSpriteOptions } from '../graphics/PixiUtils';
import { UnitSubType, UnitType, Faction } from '../types/commonTypes';
import type { Vec2 } from '../jmath/Vec';
import { EffectState } from '../cards';
import Underworld from '../Underworld';
import { HasLife, HasMana, HasSpace, HasStamina } from './Type';
import { Modifier } from '../cards/util';
export interface UnitPath {
    points: Vec2[];
    lastOwnPosition: Vec2;
    targetPosition: Vec2;
}
export declare type IUnitSerialized = Omit<IUnit, "resolveDoneMoving" | "image" | "animations" | "sfx"> & {
    image?: Image.IImageAnimatedSerialized;
};
export interface UnitAnimations {
    idle: string;
    hit: string;
    attack: string;
    die: string;
    walk: string;
}
export interface UnitSFX {
    death: string;
    damage: string;
}
export declare function isUnit(maybeUnit: any): maybeUnit is IUnit;
export declare type IUnit = HasSpace & HasLife & HasMana & HasStamina & {
    type: 'unit';
    id: number;
    unitSourceId: string;
    originalLife: boolean;
    path?: UnitPath;
    moveSpeed: number;
    resolveDoneMoving: () => void;
    attackRange: number;
    name?: string;
    isMiniboss: boolean;
    predictionScale?: number;
    faction: Faction;
    UITargetCircleOffsetY: number;
    defaultImagePath: string;
    shaderUniforms: {
        [key: string]: any;
    };
    damage: number;
    bloodColor: number;
    manaCostToCast: number;
    manaPerTurn: number;
    unitType: UnitType;
    unitSubType: UnitSubType;
    flaggedForRemoval?: boolean;
    onDamageEvents: string[];
    onDeathEvents: string[];
    onAgroEvents: string[];
    onTurnStartEvents: string[];
    onTurnEndEvents: string[];
    animations: UnitAnimations;
    sfx: UnitSFX;
    modifiers: {
        [key: string]: Modifier;
    };
};
export declare function create(unitSourceId: string, x: number, y: number, faction: Faction, defaultImagePath: string, unitType: UnitType, unitSubType: UnitSubType, sourceUnitProps: Partial<IUnit> | undefined, underworld: Underworld, prediction?: boolean): IUnit;
export declare function adjustUnitDifficulty(unit: IUnit, difficulty: number): void;
export declare function addModifier(unit: IUnit, key: string, underworld: Underworld, prediction: boolean, quantity?: number, extra?: object): void;
export declare function removeModifier(unit: IUnit, key: string, underworld: Underworld): void;
export declare function cleanup(unit: IUnit): void;
export declare function serialize(unit: IUnit): IUnitSerialized;
export declare function load(unit: IUnitSerialized, underworld: Underworld, prediction: boolean): IUnit;
export declare function syncronize(unitSerialized: IUnitSerialized, originalUnit: IUnit): void;
export declare function changeToDieSprite(unit: IUnit): void;
export declare function returnToDefaultSprite(unit: IUnit): void;
export declare function playComboAnimation(unit: IUnit, key: string | undefined, keyMoment?: () => Promise<any>, options?: PixiSpriteOptions): Promise<void>;
export declare function playAnimation(unit: IUnit, spritePath: string | undefined, options?: PixiSpriteOptions): Promise<void>;
export declare function resurrect(unit: IUnit): void;
export declare function die(unit: IUnit, underworld: Underworld, prediction: boolean): void;
export declare function composeOnDamageEvents(unit: IUnit, damage: number, underworld: Underworld, prediction: boolean): number;
export declare function takeDamage(unit: IUnit, amount: number, damageFromVec2: Vec2 | undefined, underworld: Underworld, prediction: boolean, state?: EffectState, options?: {
    thinBloodLine: boolean;
}): void;
export declare function syncPlayerHealthManaUI(underworld: Underworld): void;
export declare function canMove(unit: IUnit): boolean;
export declare function livingUnitsInDifferentFaction(unit: IUnit, underworld: Underworld): IUnit[];
export declare function livingUnitsInSameFaction(unit: IUnit, underworld: Underworld): IUnit[];
export declare function closestInListOfUnits(sourceUnit: IUnit, units: IUnit[]): IUnit | undefined;
export declare function findClosestUnitInDifferentFaction(unit: IUnit, underworld: Underworld): IUnit | undefined;
export declare function findClosestUnitInSameFaction(unit: IUnit, underworld: Underworld): IUnit | undefined;
export declare function orient(unit: IUnit, faceTarget: Vec2): void;
export declare function _moveTowards(unit: IUnit, target: Vec2, underworld: Underworld): void;
export declare function moveTowardsMulti(unit: IUnit, points: Vec2[], underworld: Underworld): Promise<void>;
export declare function moveTowards(unit: IUnit, point: Vec2, underworld: Underworld): Promise<void>;
export declare function setLocation(unit: IUnit, coordinates: Vec2): void;
export declare function changeFaction(unit: IUnit, faction: Faction): void;
export declare function syncImage(unit: IUnit): void;
export declare function getExplainPathForUnitId(id: string): string;
export declare function inRange(unit: IUnit, coords: Vec2): boolean;
export declare function runTurnStartEvents(unit: IUnit, prediction: boolean | undefined, underworld: Underworld): Promise<boolean>;
export declare function makeMiniboss(unit: IUnit): void;
export declare function copyForPredictionUnit(u: IUnit, underworld: Underworld): IUnit;
export declare function setPlayerAttributeMax(unit: IUnit, attribute: 'manaMax' | 'healthMax' | 'staminaMax', newValue: number): void;
export declare function isUnitsTurnPhase(unit: IUnit, underworld: Underworld): boolean;
export declare function subTypeToAttentionMarkerImage(unit: IUnit): string;
export declare function findLOSLocation(unit: IUnit, target: Vec2, underworld: Underworld): Vec2[];
export declare function demoAnimations(unit: IUnit): Promise<void>;
