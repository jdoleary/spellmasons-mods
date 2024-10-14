import { CardCategory } from '../../types/types/commonTypes';
import { CardRarity, probabilityMap } from '../../types/types/commonTypes';
import { refundLastSpell, Spell } from '../../types/cards/./index';
import { plusRadiusId } from '../../types/cards/plus_radius';

export const targetDistanceId = 'Distance Increase';
const radiusBoost = 20;
const spell: Spell = {
  card: {
    id: targetDistanceId,
    category: CardCategory.Blessings,
    supportQuantity: true,
    requires:[plusRadiusId],
    manaCost: 25,
    healthCost: 0,
    expenseScaling: 1,
    probability: probabilityMap[CardRarity.RARE],
    thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/Distance_Increase.png',
    description: 'spell_plus_radius',
    allowNonUnitTarget: true,
    frontload: true,
    effect: async (state, card, quantity, underworld, prediction, outOfRange) => {
      //const adjustedRadiusBoost = radiusBoost * quantity;
      //state.aggregator.radiusBoost += adjustedRadiusBoost;
      //const urns = state.targetedUnits.filter(u => u.unitSubType === UnitSubType.DOODAD);
      //urns.forEach(doodad => {
      //  doodad.attackRange += adjustedRadiusBoost * 50;
      //})
      state.casterUnit.attackRange += radiusBoost;

      // Plus radius requires other cards unless used to target an urn
      if (!(state.cardIds.some(c => c != targetDistanceId))) {
        refundLastSpell(state, prediction);
      }
      return state;
    },
  },
};
export default spell;
