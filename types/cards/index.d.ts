import type * as Player from '../entity/Player';
import * as Unit from '../entity/Unit';
import * as Pickup from '../entity/Pickup';
import type { Vec2 } from '../jmath/Vec';
import Events, { onDealDamage, onTakeDamage, onDeath, onMove, onAgro, onTurnStart, onTurnEnd, onDrawSelected, onProjectileCollision } from '../Events';
import { Subsprite } from '../Subsprites';
import Underworld from '../Underworld';
import { CardCategory } from '../types/commonTypes';
import { HasSpace } from '../entity/Type';
import { Overworld } from '../Overworld';
import { Localizable } from '../localization';
export interface Modifiers {
    subsprite?: Subsprite;
    init?: (unit: Unit.IUnit, underworld: Underworld, prediction: boolean) => void;
    add?: (unit: Unit.IUnit, underworld: Underworld, prediction: boolean, quantity: number, extra?: object) => void;
    remove?: (unit: Unit.IUnit, underworld: Underworld) => void;
}
interface Events {
    onDealDamage?: onDealDamage;
    onTakeDamage?: onTakeDamage;
    onDeath?: onDeath;
    onMove?: onMove;
    onAgro?: onAgro;
    onTurnStart?: onTurnStart;
    onTurnEnd?: onTurnEnd;
    onDrawSelected?: onDrawSelected;
    onProjectileCollision?: onProjectileCollision;
}
export interface Spell {
    card: ICard;
    modifiers?: Modifiers;
    events?: Events;
}
export declare function registerModifiers(id: string, modifiers: Modifiers): void;
export declare function registerEvents(id: string, events: Events): void;
export declare function registerSpell(spell: Spell, overworld: Overworld): void;
export declare function registerCards(overworld: Overworld): void;
export declare function refreshSummonCardDescriptions(underworld: Underworld): void;
export interface EffectState {
    cardIds: string[];
    shouldRefundLastSpell: boolean;
    casterCardUsage?: Player.CardUsage;
    casterUnit: Unit.IUnit;
    casterPositionAtTimeOfCast: Vec2;
    casterPlayer?: Player.IPlayer;
    targetedUnits: Unit.IUnit[];
    targetedPickups: Pickup.IPickup[];
    castLocation: Vec2;
    aggregator: {
        radiusBoost: number;
    };
    initialTargetedUnitId: number | undefined;
    initialTargetedPickupId: number | undefined;
}
export declare function refundLastSpell(state: EffectState, prediction: boolean, floatingMessage?: string): void;
export declare function hasTargetAtPosition(position: Vec2, underworld: Underworld): boolean;
export declare function defaultTargetsForAllowNonUnitTargetTargetingSpell(targets: Vec2[], castLocation: Vec2, card: ICard): Vec2[];
export declare function getCurrentTargets(state: EffectState): HasSpace[];
export type EffectFn = {
    (state: EffectState, card: ICard, quantity: number, underworld: Underworld, prediction: boolean, outOfRange?: boolean): Promise<EffectState>;
};
export interface ICard {
    id: string;
    replaces?: string[];
    requires?: string[];
    modName?: string;
    category: CardCategory;
    manaCost: number;
    healthCost: number;
    probability: number;
    thumbnail: string;
    animationPath?: string;
    effect: EffectFn;
    description: Localizable;
    requiresFollowingCard?: boolean;
    expenseScaling: number;
    cooldown?: number;
    allowNonUnitTarget?: boolean;
    noInitialTarget?: boolean;
    supportQuantity?: boolean;
    onlySelectDeadUnits?: boolean;
    ignoreRange?: boolean;
    sfx?: string;
}
export declare const allCards: {
    [cardId: string]: ICard;
};
export declare const allModifiers: {
    [id: string]: Modifiers;
};
export declare function getCardsFromIds(cardIds: string[]): ICard[];
export declare function addTarget(target: any, effectState: EffectState, underworld: Underworld): void;
export declare function addUnitTarget(unit: Unit.IUnit, effectState: EffectState): void;
export declare function addPickupTarget(pickup: Pickup.IPickup, effectState: EffectState): void;
export {};
