import type Underworld from "../types/Underworld";
import type * as Unit from '../types/entity/Unit';
import type { EffectState } from "../types/cards";

const {
  colors,
  JImage
} = globalThis.SpellmasonsAPI;

export const healSfx = 'heal';
const animationOptions = { loop: false, animationSpeed: 0.3 };
const staminaReplaceColors: [number, number][] = [[0xff0000, colors.stamina]];

export async function healStaminaUnits(units: Unit.IUnit[], amount: number, sourceUnit: Unit.IUnit | undefined, underworld: Underworld, prediction: boolean, state?: EffectState) {
  units = units.filter(u => u.alive);
  if (units.length == 0 || amount == 0) return;

  for (let unit of units) {
    unit.stamina += amount;
  }

  return state;
}

export async function healStaminaUnit(unit: Unit.IUnit, amount: number, sourceUnit: Unit.IUnit | undefined, underworld: Underworld, prediction: boolean, state?: EffectState) {
  const units = [unit];
  return await healStaminaUnits(units, amount, sourceUnit, underworld, prediction, state);
}

export function oneOffHealAnimation(imageHaver: any): Promise<void> {
  // The default animation for restoring mana is the
  // healing animation with a color filter on top of it

  const options = {
    loop: animationOptions.loop,
    animationSpeed: animationOptions.animationSpeed,
    colorReplace: { colors: staminaReplaceColors, epsilon: 0.1 }
  };
  return JImage.addOneOffAnimation(imageHaver, 'potionPickup', {}, options);

}