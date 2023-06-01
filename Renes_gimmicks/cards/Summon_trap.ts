import type { Spell } from '../../types/cards/index';
import { getOrInitModifier } from '../../types/cards/util';
import * as Pickup from '../../types/entity/Pickup';
import { addWarningAtMouse } from '../../types/graphics/PlanningView';
import { skyBeam } from '../../types/VisualEffects';

const {
    cardUtils,
    commonTypes,
    cards,
    Particles,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
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
        description: [`Deals damage equal to your missing health. This harms you first if you are targeted, then enemies.`],
        allowNonUnitTarget: true,
    effect: async (state, card, quantity, underworld, prediction) => {
          const summonLocation = {
            x: state.castLocation.x,
            y: state.castLocation.y
          }
          if (underworld.isCoordOnWallTile(summonLocation)) {
            if (prediction) {
              const WARNING = "Invalid Summon Location";
              //addWarningAtMouse(WARNING);
            } else {
              refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')
            }
            return state;
          }
          playDefaultSpellSFX(card, prediction);
        const index  = 0;
        //const index = Pickup.pickups.findIndex((p) => p.name === Pickup.PICKUP_SPIKES_NAME);
          if (!prediction) {
            //skyBeam(summonLocation)
            setTimeout(() => {
              underworld.spawnPickup(index, summonLocation, prediction);
              //playSFXKey('spawnPotion');
            }, 1300);
          } else {
            underworld.spawnPickup(index, summonLocation, prediction);

          }
        return state;
    },
  },
};
export default spell;