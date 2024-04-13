/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';

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

const retaliate = 0.15

const cardId = 'Sadism';
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Damage,
        supportQuantity: true,
        manaCost: 40,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/Renes_gimmicks/graphics/icons/Sadism.png',
        sfx: 'hurt',
        description: [`Damage to target equal to its attack, you receive ${retaliate * 100}% of that attack damage`],
        effect: async (state, card, quantity, underworld, prediction) => {
            let promises: any[] = [];
            //Living units
            const targets = state.targetedUnits.filter(u => u.alive);

            //Refund if no targets, this is before mana trails to help save time
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No targets damaged, mana refunded');
                return state;
            }
            for (let unit of targets) {
                let damage = unit.damage * quantity;
                Unit.takeDamage({ unit, amount: damage, fromVec2: state.casterUnit, sourceUnit: state.casterUnit }, underworld, prediction);
                Unit.takeDamage({ unit: state.casterUnit, amount: damage * retaliate }, underworld, prediction);
            }
            state.casterUnit.health -= state.casterUnit.health % 1;
            return state;
        },
    },
};
export default spell;
