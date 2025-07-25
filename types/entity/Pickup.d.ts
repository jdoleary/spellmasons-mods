import type * as PIXI from 'pixi.js';
import * as Image from '../graphics/Image';
import * as Player from './Player';
import { IUnit } from './Unit';
import { Vec2 } from '../jmath/Vec';
import Underworld from '../Underworld';
import { HasSpace } from './Type';
import { Localizable } from '../localization';
import { JEmitter } from '../types/commonTypes';
export declare const PICKUP_RADIUS = 36;
export declare const PICKUP_IMAGE_PATH = "scroll";
export declare const RED_PORTAL = "Red Portal";
export declare const BLUE_PORTAL = "Blue Portal";
export declare const HEALTH_POTION = "Health Potion";
export declare const MANA_POTION = "Mana Potion";
export declare const STAMINA_POTION = "Stamina Potion";
export declare const RECALL_POINT = "Recall";
type IPickupDescription = (pickup: IPickup, underworld: Underworld) => Localizable;
type IPickupEffect = ({ unit, player, pickup, prediction }: {
    unit?: IUnit;
    player?: Player.IPlayer;
    pickup: IPickup;
    underworld: Underworld;
    prediction: boolean;
}) => void;
type IPickupInit = ({ pickup, underworld }: {
    pickup: IPickup;
    underworld: Underworld;
}) => void;
type IPickupWillTrigger = ({ unit, player, pickup }: {
    unit?: IUnit;
    player?: Player.IPlayer;
    pickup: IPickup;
    underworld: Underworld;
}) => boolean;
export declare function isPickup(maybePickup: any): maybePickup is IPickup;
export type IPickup = HasSpace & {
    type: 'pickup';
    id: number;
    name: string;
    imagePath?: string;
    image?: Image.IImageAnimated;
    real?: IPickup;
    predictionCopy?: IPickup;
    playerOnly: boolean;
    turnsLeftToGrab?: number;
    text?: PIXI.Text;
    power: number;
    description: IPickupDescription;
    effect: IPickupEffect;
    willTrigger: IPickupWillTrigger;
    emitter?: JEmitter;
    emitterJID?: string;
    flaggedForRemoval: boolean;
    sentForceTrigger?: boolean;
};
export interface IPickupSource {
    name: string;
    modName?: string;
    imagePath?: string;
    animationSpeed?: number;
    playerOnly?: boolean;
    turnsLeftToGrab?: number;
    scale: number;
    probability: number;
    init?: IPickupInit;
    description: IPickupDescription;
    effect: IPickupEffect;
    willTrigger: IPickupWillTrigger;
}
export declare function copyForPredictionPickup(p: IPickup): IPickup;
export declare const TIME_CIRCLE_JID = "timeCircle";
export declare function create({ pos, pickupSource, idOverride, logSource }: {
    pos: Vec2;
    pickupSource: IPickupSource;
    idOverride?: number;
    logSource?: string;
}, underworld: Underworld, prediction: boolean): IPickup;
export declare function sync(pickup: IPickup): void;
export declare function setPosition(pickup: IPickup, x: number, y: number): void;
export type IPickupSerialized = Omit<IPickup, "image" | "effect" | "text" | "real" | "emitter" | "description" | "willTrigger"> & {
    image?: Image.IImageAnimatedSerialized;
    emitter?: string;
};
export declare function serialize(p: IPickup): IPickupSerialized;
export declare function load(pickup: IPickupSerialized, underworld: Underworld, prediction: boolean): IPickup | undefined;
export declare function removePickup(pickup: IPickup, underworld: Underworld, prediction: boolean): void;
export declare function triggerPickup(pickup: IPickup, unit: IUnit, player: Player.IPlayer | undefined, underworld: Underworld, prediction: boolean): void;
export declare function tryTriggerPickup(pickup: IPickup, unit: IUnit, underworld: Underworld, prediction: boolean): void;
export declare const spike_damage = 30;
export declare const PICKUP_SPIKES_NAME = "Trap";
export declare const PORTAL_PURPLE_NAME = "Portal";
export declare const PORTAL_YELLOW_NAME = "Yellow Portal";
export declare const pickups: IPickupSource[];
export declare function setPower(pickup: IPickup, newPower: number): void;
export declare function givePlayerUpgrade(p: Player.IPlayer, underworld: Underworld): void;
export {};
