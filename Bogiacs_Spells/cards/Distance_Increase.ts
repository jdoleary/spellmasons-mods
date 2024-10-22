import type { Spell } from '../../types/cards/./index';
const plusRadiusId = "Plus Radius";

const {
  commonTypes,
  cards,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const { CardCategory, probabilityMap, CardRarity, UnitType } = commonTypes;

export const targetDistanceId = 'Distance Increase';
const radiusBoost = 20;
const spell: Spell = {
  card: {
    id: targetDistanceId,
    category: CardCategory.Blessings,
    supportQuantity: true,
    requires: [plusRadiusId],
    manaCost: 25,
    healthCost: 0,
    expenseScaling: 1,
    probability: probabilityMap[CardRarity.RARE],
    thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/Distance_Increase.png',
    description: 'Increases a unit\'s attack range.  Does not affect Spellmasons.',
    effect: async (state, card, quantity, underworld, prediction, outOfRange) => {
      const units = state.targetedUnits.filter(u => u.unitType !== UnitType.PLAYER_CONTROLLED);
      for (let unit of units) {
        unit.attackRange += radiusBoost * quantity;
      }

      if (units.length === 0) {
        refundLastSpell(state, prediction, 'No Target!');
      }
      return state;
    },
  },
};
export default spell;
