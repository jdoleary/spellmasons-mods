/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
import type { CardRarity } from '../../types/types/commonTypes';

const {
    cards,
    Pickup,
    Unit,
    math,
    commonTypes,
} = globalThis.SpellmasonsAPI;
const { addTarget } = cards;
const { CardCategory, probabilityMap } = commonTypes;
const { isPickup } = Pickup;


const UNITS_PER_STACK = 3;
// Used to generate "Target HP * x" cards.
export function generateTargetHpMultipleOfSpell(multipleOf: number, manaCost: number, requiredId: number | string | undefined, rarity: CardRarity): Spell {
    let reqId;
    if (requiredId) {
        reqId = [`TargetHp${reqId}`]
    } else {
        reqId = undefined
    }
    return {
        card: {
            id: `Target Health * ${multipleOf}`,
            requires: reqId,
            category: CardCategory.Targeting,
            supportQuantity: true,
            manaCost,
            healthCost: 0,
            expenseScaling: 1,
            probability: probabilityMap[rarity],
            thumbnail: `spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/TargetHp${multipleOf}.png`,
            requiresFollowingCard: true,
            description: [`Target ${UNITS_PER_STACK} living units (per stack) with health that is any multiple of ${multipleOf}, starting with the closest from the target point.`],
            allowNonUnitTarget: true,
            effect: async (state, card, quantity, underworld, prediction, outOfRange) => {
                const targets = underworld.getPotentialTargets(prediction)
                    .filter(u => {
                        if (Unit.isUnit(u)) {
                            return u.alive && u.health % multipleOf == 0
                        } else { return false };
                    })
                    .sort(math.sortCosestTo(state.castLocation))
                    .slice(0, UNITS_PER_STACK * quantity);
                for (let target of targets) {
                    addTarget(target, state, underworld, prediction);
                }
                return state;
            }
        },
    }
}

function isPrime(num: number): boolean {
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

export const TargetHp3 = generateTargetHpMultipleOfSpell(3, 30, 'Prime', commonTypes.CardRarity.UNCOMMON);
export const TargetHp4 = generateTargetHpMultipleOfSpell(4, 35, 3, commonTypes.CardRarity.RARE);
export const TargetHp5 = generateTargetHpMultipleOfSpell(5, 40, 4, commonTypes.CardRarity.FORBIDDEN);
export const TargetHpPrime: Spell = {
    card: {
        id: `Target Health Prime`,
        category: CardCategory.Targeting,
        supportQuantity: false,
        manaCost: 25,
        healthCost: 0,
        expenseScaling: 4,
        probability: probabilityMap[commonTypes.CardRarity.COMMON],
        thumbnail: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/TargetHpPrime.png',
        requiresFollowingCard: true,
        description: [`Target ${UNITS_PER_STACK} living units (per stack) with health that is any prime number, starting with the closest from the target point.`],
        allowNonUnitTarget: true,
        ignoreRange: true,
        effect: async (state, card, quantity, underworld, prediction, outOfRange) => {
            const targets = underworld.getPotentialTargets(prediction)
                .filter(u => {
                    if (Unit.isUnit(u)) {
                        return u.alive && isPrime(u.health)
                    } else { return false };
                })
                .sort(math.sortCosestTo(state.castLocation))
                .slice(0, UNITS_PER_STACK * quantity);
            for (let target of targets) {
                addTarget(target, state, underworld, prediction);
            }
            return state;
        }
    },
}