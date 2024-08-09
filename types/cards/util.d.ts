import { IUnit } from "../entity/Unit";
export interface Modifier {
    [key: string]: any;
    isCurse: boolean;
    quantity: number;
    keepOnDeath?: boolean;
}
export declare function getOrInitModifier(unit: IUnit, key: string, { isCurse, quantity, keepOnDeath, ...rest }: Modifier, firstTimeSetup: () => void): Modifier;
export declare function quantityWithUnit(quantity: number, unitOfMeasure: string | undefined): string;
