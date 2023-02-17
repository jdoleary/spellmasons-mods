import type { CardCost } from './cards/cardUtils';
import { IPlayer } from './entity/Player';
import Underworld from './Underworld';
import { CardCategory } from './types/commonTypes';
export interface IUpgrade {
    title: string;
    modName?: string;
    type: 'card' | 'special';
    cardCategory?: CardCategory;
    description: (player: IPlayer) => string;
    thumbnail: string;
    maxCopies?: number;
    effect: (player: IPlayer, underworld: Underworld) => void;
    probability: number;
    cost: CardCost;
}
export declare function generateUpgrades(player: IPlayer, numberOfUpgrades: number, minimumProbability: number, underworld: Underworld): IUpgrade[];
export declare function createUpgradeElement(upgrade: IUpgrade, player: IPlayer, underworld: Underworld): HTMLDivElement | undefined;
export declare function getUpgradeByTitle(title: string): IUpgrade | undefined;
export declare const upgradeSourceWhenDead: IUpgrade[];
export declare const upgradeCardsSource: IUpgrade[];
