import type { ICard } from ".";
import type { CardUsage } from "../entity/Player";
import { Vec2 } from "../jmath/Vec";
import * as Image from '../graphics/Image';
import { Container } from "pixi.js";
export interface CardCost {
    manaCost: number;
    healthCost: number;
}
export declare function playSpellSFX(sfxKey: string, prediction: boolean): void;
export declare function playDefaultSpellSFX(card: ICard, prediction: boolean): void;
export declare function playDefaultSpellAnimation(card: ICard, targets: Vec2[], prediction: boolean): Promise<void | void[]>;
export declare function animateSpell(target: Vec2, imagePath: string): Promise<void>;
export declare function oneOffImage(coords: Vec2, imagePath: string, parent: Container | undefined, resolver?: () => void): Image.IImageAnimated | undefined;
export declare function calculateCostForSingleCard(card: ICard, timesUsedSoFar?: number): CardCost;
export declare function calculateCost(cards: ICard[], casterCardUsage: CardUsage): CardCost;
export declare function _getCardsFromIds(cardIds: string[], cards: {
    [cardId: string]: ICard;
}): ICard[];
