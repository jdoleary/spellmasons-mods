import { Spell } from '../../types/cards/./index';
import { chaosWarpCardId } from './Chaos_Warp';

const {
    commonTypes,
    cards,
    VisualEffects,
    rand,
    Pickup,
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
            }

            const seed = rand.seedrandom(`${getUniqueSeedString(underworld)} - ${Math.random()}`);

            const choicePotion = chooseObjectWithProbability(Pickup.pickups.map((p, indexPotion) => {
                return {
                    indexPotion, probability: p.name.includes('Potion') ? p.probability : 0
                }
            }), seed);
            if (choicePotion) {
                const { indexPotion } = choicePotion;
                if (summonLocation) {
                    underworld.spawnPickup(indexPotion, summonLocation, prediction);

                    if (!prediction) {
                        //setTimeout(() => {
                        //    playSFXKey('spawnPotion');
                        //}, 1000);
                        VisualEffects.skyBeam(summonLocation)
                    }
                } else {
                    refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')
                }
            } else {
                refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')

            }

            return state;
        },
    },
};
export default spell;