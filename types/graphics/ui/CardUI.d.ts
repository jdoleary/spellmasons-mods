import type * as Player from '../../entity/Player';
import * as Cards from '../../cards';
import Underworld from '../../Underworld';
import { Overworld } from '../../Overworld';
export declare const elCardHand: HTMLElement;
export declare const elFloatingCardHolderLeft: HTMLElement;
export declare const elFloatingCardHolderRight: HTMLElement;
export declare function setupCardUIEventListeners(overworld: Overworld): void;
export declare function clearCurrentlyShownCard(): void;
export declare function recalcPositionForCards(player: Player.IPlayer | undefined, underworld: Underworld): void;
export declare const openInvClass = "open-inventory";
export declare function syncInventory(slotModifyingIndex: number | undefined, underworld: Underworld): void;
export declare function toggleInventory(toolbarIndex: number | undefined, forceState: boolean | undefined, underworld: Underworld): void;
export declare function deselectLastCard(underworld: Underworld): void;
export declare function selectCardByIndex(index: number, cardHolder: HTMLElement): void;
export declare function areAnyCardsSelected(): boolean;
export declare function getSelectedCardIds(): string[];
export declare function getSelectedCards(): Cards.ICard[];
export declare function clearSelectedCards(underworld: Underworld): void;
export declare function cardRarityAsString(content: {
    probability: number;
}): string;
export declare function getCardRarityColor(content: {
    probability: number;
}): string;
export declare function getSpellThumbnailPath(path?: string): string;
export declare function getReplacesCardText(replaces: string[], requires?: string[]): HTMLDivElement;
export declare function updateCardBadges(underworld: Underworld): void;
export declare function cardListToImages(cardIds: string[]): string;
