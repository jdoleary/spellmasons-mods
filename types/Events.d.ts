import type { Vec2 } from './jmath/Vec';
import type { IUnit } from './entity/Unit';
import Underworld from './Underworld';
export type onDamage = {
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
    (unit: IUnit, prediction: boolean, underworld: Underworld): Promise<boolean>;
};
export type onTurnEnd = {
    (unit: IUnit, prediction: boolean, underworld: Underworld): Promise<void>;
};
export type onDrawSelected = {
    (unit: IUnit, prediction: boolean, underworld: Underworld): Promise<void>;
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
    onDrawSelectedSource: {
        [name: string]: onDrawSelected;
    };
};
export default _default;
