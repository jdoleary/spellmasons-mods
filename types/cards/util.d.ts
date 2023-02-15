import { IUnit } from "../entity/Unit";
export interface Modifier {
    [key: string]: any;
    isCurse: boolean;
    quantity: number;
    persistBetweenLevels: boolean;
}
export declare function getOrInitModifier(unit: IUnit, key: string, { isCurse, quantity, persistBetweenLevels, ...rest }: Modifier, firstTimeSetup: () => void): Modifier;
