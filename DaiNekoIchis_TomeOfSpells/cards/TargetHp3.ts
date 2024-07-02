/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
import { id as requiredId } from './TargetHpPrime';
const {
    cards,
    commonTypes,
    Pickup
} = globalThis.SpellmasonsAPI;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;
const { isPickup } = Pickup;

const multipleOf = 3;
export const id = `Target Health * ${multipleOf}`;
const spell: Spell = {
    card: {
        id,
        requires: [requiredId],
        category: CardCategory.Targeting,
        supportQuantity: false,
        manaCost: 55,
        healthCost: 0,
        expenseScaling: 3,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/TargetHp3.png',
        requiresFollowingCard: true,
        description: [`Target all living units with health that is any multiple of ${multipleOf}. Best used first before any other targeting spell.`],
        allowNonUnitTarget: true,
        ignoreRange: true,
        effect: async (state, card, quantity, underworld, prediction, outOfRange) => {
            const targets = (prediction ? underworld.unitsPrediction : underworld.units).filter(u => u.alive && !isPickup(u) && u.health % multipleOf == 0);
            for (let target of targets) {
                cards.addTarget(target, state, underworld);
            }
            return state;
        }
    },
}
export default spell;