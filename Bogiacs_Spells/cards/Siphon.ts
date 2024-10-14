import { makeManaTrail } from '../../types/graphics/Particles';
import { CardCategory } from '../../types/types/commonTypes';
import { CardRarity, probabilityMap } from '../../types/types/commonTypes';
import { Spell } from '../../types/cards/./index';
import * as Unit from '../../types/entity/Unit';
import { healUnit } from '../../types/effects/heal';

export const siphonCardId = 'Siphon';
const amount = 10;
const delayBetweenAnimations = 400;

const spell: Spell = {
  card: {
    id: siphonCardId,
    category: CardCategory.Mana,
    sfx: 'potionPickupMana',
    supportQuantity: true,
    manaCost: 5,
    healthCost: 5,
    expenseScaling: 2,
    probability: probabilityMap[CardRarity.FORBIDDEN],
    thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/Siphon.png',
    animationPath: 'potionPickup',
    description: `Drain 10 health and 10 mana from targets.`,
    effect: async (state, card, quantity, underworld, prediction) => {
      const targets = state.targetedUnits.filter(u => u.alive);
      let promises = [];
      for (let unit of targets) {
        if (!prediction) {
            for (let i = 0; i < quantity; i++) {
                unit.mana -= amount;

                Unit.takeDamage({
                    unit: unit,
                    amount: amount,
                    sourceUnit: state.casterUnit,
                    fromVec2: state.casterUnit,
                }, underworld, prediction);

                //health trail
                promises.push(makeManaTrail(unit, state.casterUnit, underworld, '#fff9e4', '#ffcb3f', targets.length * quantity));

                await new Promise(resolve => setTimeout(resolve, delayBetweenAnimations));

                //mana trail
                promises.push(makeManaTrail(unit, state.casterUnit, underworld, '#e4f9ff', '#3fcbff', targets.length * quantity));
            }
          }
          
      }
      await Promise.all(promises);
      const finalManaReceived = amount * quantity * targets.length;
        state.casterUnit.mana += finalManaReceived;
        healUnit(state.casterUnit, finalManaReceived,state.casterUnit, underworld, prediction, state);
      //refund if no targets ?
      return state;
    },
  },
};
export default spell;
