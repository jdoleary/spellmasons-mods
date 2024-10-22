import * as Image from '../graphics/Image';
export interface HasSpace {
    x: number;
    y: number;
    radius: number;
    inLiquid: boolean;
    image?: Image.IImageAnimated;
    immovable: boolean;
    beingPushed: boolean;
    flaggedForRemoval?: boolean;
    debugName?: string;
}
export declare function hasSpace(maybe: any): maybe is HasSpace;
export interface HasLife {
    alive: boolean;
    health: number;
    healthMax: number;
}
export declare function hasLife(maybe: any): maybe is HasLife;
export interface HasMana {
    mana: number;
    manaMax: number;
}
export interface HasStamina {
    stamina: number;
    staminaMax: number;
}
