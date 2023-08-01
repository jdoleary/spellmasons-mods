import type { Vec2 } from './jmath/Vec';
import type { IUnit } from './entity/Unit';
import Underworld from './Underworld';
export declare type onDamage = {
    (unit: IUnit, amount: number, underworld: Underworld, prediction: boolean, damageDealer?: IUnit): number;
};
export declare type onDeath = {
    (unit: IUnit, underworld: Underworld, prediction: boolean): Promise<void>;
};
export declare type onMove = {
    (unit: IUnit, newLocation: Vec2): Vec2;
};
export declare type onAgro = {
    (agroer: IUnit, agroTarget: IUnit): IUnit;
};
export declare type onTurnStart = {
    (unit: IUnit, prediction: boolean, underworld: Underworld): Promise<boolean>;
};
export declare type onTurnEnd = {
    (unit: IUnit, underworld: Underworld, prediction: boolean): Promise<void>;
};
declare const _default: {
    onAgroSource: {
        [name: string]: onAgro;
    };
    onDamageSource: {
        [name: string]: onDamage;
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
};
export default _default;
