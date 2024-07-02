/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
import { id as requiredId } from './TargetHp3';
const {
    cards,
    commonTypes,
    Pickup
} = globalThis.SpellmasonsAPI;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;
const { isPickup } = Pickup;

const multipleOf = 4;
export const id = `Target Health * ${multipleOf}`;
const spell: Spell = {
    card: {
        id,
        requires: [requiredId],
        category: CardCategory.Targeting,
        supportQuantity: false,
        manaCost: 60,
        healthCost: 0,
        expenseScaling: 4,
        probability: probabilityMap[CardRarity.RARE],
        thumbnail: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/TargetHp4.png',
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