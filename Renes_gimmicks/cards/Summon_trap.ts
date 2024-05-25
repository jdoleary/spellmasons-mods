import type { Spell } from '../../types/cards/index';

const {
  cardUtils,
  commonTypes,
  cards,
  VisualEffects,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'Summon Trap';
const spell: Spell = {
  card: {
    id: cardId,
    category: CardCategory.Damage,
    supportQuantity: false,
    manaCost: 40,
    healthCost: 0,
    expenseScaling: 1.5,
    probability: probabilityMap[CardRarity.UNCOMMON],
    thumbnail: 'spellmasons-mods/Renes_gimmicks/graphics/icons/SummonTrap.png',
    sfx: 'hurt',
    description: [`Summons a trap that does 30 damage when stepped on`],
    allowNonUnitTarget: true,
    effect: async (state, card, _quantity, underworld, prediction) => {
      const summonLocation = {
        x: state.castLocation.x,
        y: state.castLocation.y
      }
      if (underworld.isCoordOnWallTile(summonLocation)) {
        if (prediction) {
          // const WARNING = "Invalid Summon Location";
          //addWarningAtMouse(WARNING);
        } else {
          refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')
        }
        return state;
      }
      playDefaultSpellSFX(card, prediction);
      const index = 0;
      //const index = Pickup.pickups.findIndex((p) => p.name === Pickup.PICKUP_SPIKES_NAME);
      if (!prediction) {
        VisualEffects.skyBeam(summonLocation)
        underworld.spawnPickup(index, summonLocation, prediction);
      } else {
        underworld.spawnPickup(index, summonLocation, prediction);

      }
      return state;
    },
  },
};
export default spell;