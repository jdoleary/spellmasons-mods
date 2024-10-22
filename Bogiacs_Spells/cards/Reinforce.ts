import { Spell } from '../../types/cards';

const {
  commonTypes,
} = globalThis.SpellmasonsAPI;

const { CardCategory, probabilityMap, CardRarity, UnitType } = commonTypes;

export const reinforceCardId = 'Reinforce';
const reinforceAmount = 20;

const spell: Spell = {
  card: {
    id: reinforceCardId,
    category: CardCategory.Blessings,
    supportQuantity: true,
    manaCost: 40,
    healthCost: 0,
    expenseScaling: 1,
    probability: probabilityMap[CardRarity.RARE],
    thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/Reinforce.png',
    animationPath: 'potionPickup',
    description: 'Increases Max HP by ' + reinforceAmount.toString() + '.  Does not affect Spellmasons.',

    effect: async (state, card, quantity, underworld, prediction) => {
      const units = state.targetedUnits.filter(u => u.unitType !== UnitType.PLAYER_CONTROLLED);
      for (let unit of units) {
        unit.healthMax += reinforceAmount;
        unit.health += reinforceAmount;
      }
      return state;
    },
  },
};
export default spell;
