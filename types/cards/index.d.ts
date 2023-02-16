import type * as Player from '../entity/Player';
import * as Unit from '../entity/Unit';
import * as Pickup from '../entity/Pickup';
import * as Doodad from '../entity/Doodad';
import type { Vec2 } from '../jmath/Vec';
import Events, { onDamage, onDeath, onMove, onAgro, onTurnStart, onTurnEnd } from '../Events';
import { Subsprite } from '../Subsprites';
import { UnitDamage } from './slash';
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
    onDamage?: onDamage;
    onDeath?: onDeath;
    onMove?: onMove;
    onAgro?: onAgro;
    onTurnStart?: onTurnStart;
    onTurnEnd?: onTurnEnd;
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
export interface EffectState {
    cardIds: string[];
    shouldRefundLastSpell: boolean;
    casterCardUsage?: Player.CardUsage;
    casterUnit: Unit.IUnit;
    casterPositionAtTimeOfCast: Vec2;
    casterPlayer?: Player.IPlayer;
    targetedUnits: Unit.IUnit[];
    targetedPickups: Pickup.IPickup[];
    targetedDoodads: Doodad.IDoodad[];
    castLocation: Vec2;
    aggregator: {
        unitDamage: UnitDamage[];
        radius: number;
    };
    initialTargetedUnitId: number | undefined;
    initialTargetedPickupId: number | undefined;
}
export declare function refundLastSpell(state: EffectState, prediction: boolean, floatingMessage?: string): void;
export declare function hasTargetAtPosition(position: Vec2, underworld: Underworld): boolean;
export declare function defaultTargetsForAllowNonUnitTargetTargetingSpell(targets: Vec2[], castLocation: Vec2, card: ICard): Vec2[];
export declare function getCurrentTargets(state: EffectState): HasSpace[];
export declare type EffectFn = {
    (state: EffectState, card: ICard, quantity: number, underworld: Underworld, prediction: boolean, outOfRange?: boolean): Promise<EffectState>;
};
export interface ICard {
    id: string;
    category: CardCategory;
    manaCost: number;
    healthCost: number;
    probability: number;
    thumbnail: string;
    modName?: string;
    animationPath?: string;
    effect: EffectFn;
    description: Localizable;
    requiresFollowingCard?: boolean;
    expenseScaling: number;
    allowNonUnitTarget?: boolean;
    supportQuantity?: boolean;
    onlySelectDeadUnits?: boolean;
    sfx?: string;
}
export declare const allCards: {
    [cardId: string]: ICard;
};
export declare const allModifiers: {
    [id: string]: Modifiers;
};
export declare function getCardsFromIds(cardIds: string[]): ICard[];
export declare function addTarget(target: any, effectState: EffectState): void;
export declare function addUnitTarget(unit: Unit.IUnit, effectState: EffectState): void;
export declare function addPickupTarget(pickup: Pickup.IPickup, effectState: EffectState): void;
export declare function addDoodadTarget(doodad: Doodad.IDoodad, effectState: EffectState): void;
export {};
