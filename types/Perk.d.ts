import Underworld from "./Underworld";
import seedrandom from "seedrandom";
import { IPlayer } from "./entity/Player";
export declare function cleanUpPerkList(): void;
export declare function getPerkText(perk: AttributePerk, omitWhen?: boolean): string;
export declare function createPerkElement(perk: AttributePerk, player: IPlayer, underworld: Underworld): HTMLDivElement | undefined;
export declare type UpgradableAttribute = 'staminaMax' | 'stamina' | 'healthMax' | 'health' | 'manaMax' | 'mana' | 'attackRange';
export declare type WhenUpgrade = 'immediately' | 'everyLevel' | 'everyTurn';
export declare function generatePerks(number: number, underworld: Underworld): AttributePerk[];
export declare function choosePerk(perk: AttributePerk, player: IPlayer, underworld: Underworld): void;
export declare function hidePerkList(): void;
export declare function showPerkList(player: IPlayer): void;
export interface AttributePerk {
    attribute: UpgradableAttribute;
    certainty: number;
    when: WhenUpgrade;
    amount: number;
}
export declare function tryTriggerPerk(perk: AttributePerk, player: IPlayer, when: WhenUpgrade, random: seedrandom.PRNG, underworld: Underworld, offsetNotifyByMs: number): void;
