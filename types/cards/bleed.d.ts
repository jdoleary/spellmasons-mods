import { Spell } from './index';
export declare const bleedCardId = "Bleed";
export interface UnitDamage {
    id: number;
    x: number;
    y: number;
    health: number;
    damageTaken: number;
}
export declare const bleedInstantKillProportion = 0.3;
declare const spell: Spell;
export default spell;
