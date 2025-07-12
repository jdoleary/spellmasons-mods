import type { ICard, Modifiers } from ".";
import { type CardUsage, type IPlayer } from "../entity/Player";
import { Vec2 } from "../jmath/Vec";
import * as Image from '../graphics/Image';
import { Container } from "pixi.js";
import Underworld from "../Underworld";
export interface CardCost {
    manaCost: number;
    healthCost: number;
    staminaCost: number;
    soulFragmentCost?: number;
}
export declare function isRune(m?: Modifiers): boolean;
export declare function levelsUntilCardIsEnabled(cardId: string, underworld?: Underworld): number;
export declare function playSpellSFX(sfxKey: string, prediction: boolean): void;
export declare function playDefaultSpellSFX(card: ICard, prediction: boolean): void;
export declare function playDefaultSpellAnimation(card: ICard, targets: Vec2[], prediction: boolean): Promise<void | void[]>;
export declare function animateSpell(target: Vec2, imagePath: string): Promise<void>;
export declare function oneOffImage(coords: Vec2, imagePath: string, parent: Container | undefined, resolver?: () => void): Image.IImageAnimated | undefined;
export declare function calculateCostForSingleCard(card: ICard, timesUsedSoFar?: number, caster?: IPlayer): CardCost;
export declare function calculateCost(cards: ICard[], casterCardUsage: CardUsage, caster?: IPlayer): CardCost;
export declare function _getCardsFromIds(cardIds: string[], cards: {
    [cardId: string]: ICard;
}): ICard[];
export declare function deathmasonCardProbabilities(cards: ICard[]): {
    id: string;
    probability: number;
    card: ICard;
    cost: number;
}[];
