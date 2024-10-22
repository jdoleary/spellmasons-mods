import { Spell } from '../../types/cards/./index';
import { chaosWarpCardId } from './Chaos_Warp';

const {
    commonTypes,
    cards,
    VisualEffects,
    rand,
    Pickup,
    JAudio,
} = globalThis.SpellmasonsAPI;

const { chooseObjectWithProbability, getUniqueSeedString } = rand;
const { refundLastSpell } = cards;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const chaosWarpPotionCardId = 'Chaos Warp - Potion';
const spell: Spell = {
    card: {
        id: chaosWarpPotionCardId,
        category: CardCategory.Soul,
        supportQuantity: false,
        requires: [chaosWarpCardId],
        manaCost: 40,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.RARE],
        thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/ChaosWarpPotion.png',
        sfx: 'spawnPotion',
        description: [`Summons a random Potion`],
        allowNonUnitTarget: true,
        effect: async (state, card, _quantity, underworld, prediction) => {

            const summonLocation = {
                x: state.castLocation.x,
                y: state.castLocation.y
            };
            if (!underworld.isPointValidSpawn(summonLocation, prediction)) {
                refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')
                return state;
            }

            // Unique to player and cast location so it doesn't spawn the same choice over and over
            const seed = rand.seedrandom(`${getUniqueSeedString(underworld, state.casterPlayer)}${state.castLocation.x}${state.castLocation.y}`);

            const choicePotion = chooseObjectWithProbability(Pickup.pickups.map((p, indexPotion) => {
                return {
                    indexPotion, probability: p.name.includes('Potion') ? p.probability : 0
                }
            }), seed);
            if (choicePotion) {
                const { indexPotion } = choicePotion;
                underworld.spawnPickup(indexPotion, summonLocation, prediction);

                if (!prediction) {
                    JAudio.playSFXKey('spawnPotion');
                    VisualEffects.skyBeam(summonLocation)
                }
            } else {
                refundLastSpell(state, prediction)

            }

            return state;
        },
    },
};
export default spell;