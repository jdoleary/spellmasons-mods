import type { IUnit } from "../../types/entity/Unit";
import Underworld from "../../types/Underworld";
import { CardCategory } from '../../types/types/commonTypes';
import { CardRarity, probabilityMap } from '../../types/types/commonTypes';
import { thornsId } from "../../types/modifierThorns";
import { getOrInitModifier } from "../../types/cards/util";
import { playDefaultSpellSFX } from "../../types/cards/cardUtils";
import * as Image from '../../types/graphics/Image';
import { EffectState, Spell } from '../../types/cards/./index';
import * as Unit from '../../types/entity/Unit';

export const reflectCardId = 'Reflect';
export function hasReflect(unit: IUnit): boolean {
return Object.keys(unit.modifiers).some(m => m === reflectCardId)
}
const reflectMultiplier = 0.2;
let caster: EffectState;
export const modifierImagePath = 'modifierShield.png';

function add(unit: IUnit, underworld: Underworld, prediction: boolean, quantity: number=1) {
      
    getOrInitModifier(unit, reflectCardId, { isCurse: false, quantity }, () => {
        // Add event
        Unit.addEvent(unit, reflectCardId);
        const animatedReflectSprite = Image.addSubSprite(unit.image, modifierImagePath);
        if (animatedReflectSprite) {
            // Make it red just so it looks distinct from shield
            animatedReflectSprite.tint = 0xff1100;
        }
      });

}

const spell: Spell = {
  card: {
    id: reflectCardId,
    category: CardCategory.Blessings,
    supportQuantity:true,
    manaCost: 80,
    healthCost: 0,
    expenseScaling: 3,
    costGrowthAlgorithm: 'nlogn',
    probability: probabilityMap[CardRarity.RARE],
    thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/Reflect.png',
    animationPath: 'spellShield',
    description: `Reflects ` + (reflectMultiplier*100).toString() + `% of damage received back to attackers.`,
    effect: async (state, card, quantity, underworld, prediction) => {
      // .filter: only target living units
      for (let unit of state.targetedUnits.filter(u => u.alive)) {
          caster = state;
          let animationPromise = Promise.resolve();
            animationPromise = Image.addOneOffAnimation(unit, 'priestProjectileHit', {}, { loop: false });
          
          playDefaultSpellSFX(card, prediction);
          // We only need to wait for one of these promises, since they all take the same amount of time to complete
          await animationPromise;
        Unit.addModifier(unit, reflectCardId, underworld, prediction);
      }
      return state;
    },
  },
  modifiers: {
    //stage: `Reflect`,
    add,
    subsprite: {
        imageName: modifierImagePath,
        alpha: 0.65,
        anchor: {
            x: 0.5,
            y: 0.5,
        },
        scale: {
            x: 1.25,
            y: 1.25,
        },
    },
  },
  events: {
    onTooltip: (unit: Unit.IUnit, underworld: Underworld) => {
        const modifier = unit.modifiers[reflectCardId];
      if (modifier) {
          // Set tooltip:
          if (modifier.quantity == 1) {
              modifier.tooltip = `Reflects ` + (reflectMultiplier * 100).toString() + `% of damage received back to attacker ` + (modifier.quantity).toString() + ` time.`;
          }
          else {
              modifier.tooltip = `Reflects ` + (reflectMultiplier * 100).toString() + `% of damage received back to attacker ` + (modifier.quantity).toString() + ` times.`;
          }
      }
    },
    onTakeDamage: (unit: IUnit, amount: number, _underworld: Underworld, prediction: boolean, damageDealer?: IUnit) => {
      
        const modifier = unit.modifiers[reflectCardId];
        if (modifier) {
            // Reflect will not deal damage if we are being healed
            if (damageDealer && amount > 0) {
                // Reflect should not trigger Reflect nor Thorns
                // Exception: Temporarily remove the damageDealer's Reflect event to prevent infinite loop
                damageDealer.events = damageDealer.events.filter(x => x !== reflectCardId);
                damageDealer.events = damageDealer.events.filter(x => x !== thornsId);

                // Deal flat damage to the attacker
                Unit.takeDamage({
                    unit: damageDealer,
                    amount: amount * reflectMultiplier,
                    sourceUnit: unit,
                }, _underworld, prediction);

                // Restore the Reflect event if the damageDealer still has the Reflect modifier
                if (damageDealer.modifiers[reflectCardId]) {
                    Unit.addEvent(damageDealer, reflectCardId);
                }

                if (damageDealer.modifiers[thornsId]) {
                    Unit.addEvent(damageDealer, thornsId);
                }

                modifier.quantity -=1

                if (modifier.quantity == 0) {
                    Unit.removeModifier(caster.casterUnit, reflectCardId, _underworld);
                }
                
            }
        }

        amount = 0;
        // Thorns does not modify incoming damage
        return amount;
    },
  },
};
export default spell;