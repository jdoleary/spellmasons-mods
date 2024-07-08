import type { Vec2 } from './jmath/Vec';
import type { IUnit } from './entity/Unit';
import Underworld from './Underworld';
import { IPickup } from './entity/Pickup';
import { ForceMoveProjectile } from './jmath/moveWithCollision';
export type onDealDamage = {
    (damageDealer: IUnit, amount: number, underworld: Underworld, prediction: boolean, damageReciever?: IUnit): number;
};
export type onTakeDamage = {
    (unit: IUnit, amount: number, underworld: Underworld, prediction: boolean, damageDealer?: IUnit): number;
};
export type onDeath = {
    (unit: IUnit, underworld: Underworld, prediction: boolean): Promise<void>;
};
export type onMove = {
    (unit: IUnit, newLocation: Vec2): Vec2;
};
export type onAgro = {
    (agroer: IUnit, agroTarget: IUnit): IUnit;
};
export type onTurnStart = {
    (unit: IUnit, underworld: Underworld, prediction: boolean): Promise<void>;
};
export type onTurnEnd = {
    (unit: IUnit, underworld: Underworld, prediction: boolean): Promise<void>;
};
export type onDrawSelected = {
    (unit: IUnit, underworld: Underworld, prediction: boolean): Promise<void>;
};
export type onProjectileCollision = ({ unit, pickup, projectile, underworld, prediction }: {
    unit?: IUnit;
    pickup?: IPickup;
    projectile: ForceMoveProjectile;
    underworld: Underworld;
    prediction: boolean;
}) => void;
declare const _default: {
    onAgroSource: {
        [name: string]: onAgro;
    };
    onDealDamageSource: {
        [name: string]: onDealDamage;
    };
    onTakeDamageSource: {
        [name: string]: onTakeDamage;
    };
    onDeathSource: {
        [name: string]: onDeath;
    };
    onMoveSource: {
        [name: string]: onMove;
    };
    onTurnStartSource: {
        [name: string]: onTurnStart;
    };
    onTurnEndSource: {
        [name: string]: onTurnEnd;
    };
    onDrawSelectedSource: {
        [name: string]: onDrawSelected;
    };
    onProjectileCollisionSource: {
        [name: string]: onProjectileCollision;
    };
};
export default _default;
