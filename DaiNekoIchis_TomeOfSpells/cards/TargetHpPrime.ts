/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
const {
    cards,
    commonTypes,
    Pickup
} = globalThis.SpellmasonsAPI;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;
const { isPickup } = Pickup;

function isPrime(num: number) : boolean {
    if (num <= 1) { 
        return false; // 0 and 1 are neither both prime nor composite numbers
    }
    for (let n = 2; n < num; n++) {
        if (num % n == 0) {
            return false;
        }
    }
    return true;
}

export const id = `Target Health Prime`;
const spell: Spell = {
    card: {
        id,
        category: CardCategory.Targeting,
        supportQuantity: false,
        manaCost: 50,
        healthCost: 0,
        expenseScaling: 4,
        probability: probabilityMap[CardRarity.COMMON],
        thumbnail: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/TargetHpPrime.png',
        requiresFollowingCard: true,
        description: [`Target all living units with health that is a prime number. Best used first before any other targeting spell.`],
        allowNonUnitTarget: true,
        ignoreRange: true,
        effect: async (state, card, quantity, underworld, prediction, outOfRange) => {
            const targets = (prediction ? underworld.unitsPrediction : underworld.units).filter(u => u.alive && !isPickup(u) && isPrime(u.health));
            for (let target of targets) {
                cards.addTarget(target, state, underworld);
            }
            return state;
        }
    },
}
export default spell;