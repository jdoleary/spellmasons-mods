import * as Unit from './Unit';
import * as Upgrade from '../Upgrade';
import * as Cards from '../cards';
import Underworld from '../Underworld';
import { AttributePerk } from '../Perk';
export declare type IPlayerSerialized = Omit<IPlayer, "unit"> & {
    unit: {
        id: number;
    };
};
export interface CardUsage {
    [cardId: string]: number;
}
interface Stats {
    bestSpell: {
        unitsKilled: number;
        spell: string[];
    };
    longestSpell: string[];
    gameStartTime: number;
    totalKills: number;
}
export declare enum MageType {
    Spellmason = 0,
    Timemason = 1,
    Bloodmason = 2,
    Necromancer = 3
}
export interface IPlayer {
    name: string;
    mageType?: MageType;
    color: number;
    colorMagic: number;
    endedTurn: boolean;
    clientId: string;
    clientConnected: boolean;
    unit: Unit.IUnit;
    awaitingSpawn: boolean;
    isSpawned: boolean;
    cards: string[];
    inventory: string[];
    upgrades: Upgrade.IUpgrade[];
    upgradesLeftToChoose: number;
    perksLeftToChoose: number;
    cardUsageCounts: CardUsage;
    lobbyReady: boolean;
    reroll: number;
    attributePerks: AttributePerk[];
    spellState: {
        [spellId: string]: any;
    };
    stats: Stats;
    cursesChosen: number;
}
export declare function inPortal(player: IPlayer): boolean;
export declare function changeMageType(type: MageType, player: IPlayer, underworld: Underworld): void;
export declare function create(clientId: string, underworld: Underworld): IPlayer;
export declare function setPlayerRobeColor(player: IPlayer, color: number | string, colorMagic?: number | string): void;
export declare function resetPlayerForNextLevel(player: IPlayer, underworld: Underworld): void;
export declare function updateGlobalRefToCurrentClientPlayer(player: IPlayer, underworld: Underworld): void;
export declare function serialize(player: IPlayer): IPlayerSerialized;
export declare function load(player: IPlayerSerialized, underworld: Underworld): IPlayer | undefined;
export declare function setClientConnected(player: IPlayer, connected: boolean, underworld: Underworld): void;
export declare function syncLobby(underworld: Underworld): void;
export declare function enterPortal(player: IPlayer, underworld: Underworld): void;
export declare function ableToAct(player: IPlayer): boolean;
export declare function addCardToHand(card: Cards.ICard | undefined, player: IPlayer | undefined, underworld: Underworld): void;
export declare function setSpellmasonsToChannellingAnimation(player: IPlayer): void;
export declare function removeCardsFromHand(player: IPlayer, cards: string[], underworld: Underworld): void;
export {};
