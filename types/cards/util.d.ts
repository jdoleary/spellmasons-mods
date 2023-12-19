import { IUnit } from "../entity/Unit";
export interface Modifier {
    [key: string]: any;
    isCurse: boolean;
    quantity: number;
    keepOnDeath?: boolean;
    keepBetweenLevels?: boolean;
}
export declare function getOrInitModifier(unit: IUnit, key: string, { isCurse, quantity, keepOnDeath, keepBetweenLevels, ...rest }: Modifier, firstTimeSetup: () => void): Modifier;
