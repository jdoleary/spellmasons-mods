/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';

const {
    PixiUtils,
    cardUtils,
    commonTypes,
    cards,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const { containerSpells } = PixiUtils;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { oneOffImage } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const animationPath = 'VampBite';
//const delayBetweenAnimationsStart = 400;

const cardId = 'Vampire Bite';
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Damage,
        supportQuantity: true,
        manaCost: 15,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/Renes_gimmicks/graphics/icons/VampireBite.png',
        animationPath,
        sfx: 'hurt',
        description: [`Deals 10 to the target and heals you for up to 50% damage done. Healing is not affected by modifiers, including blood curse`],
        // TODO timeout needs validation
        timeoutMs: 1000,
        effect: async (state, _card, quantity, underworld, prediction) => {
            //Living units
            const targets = state.targetedUnits.filter(u => u.alive);

            //Refund if no targets, this is before mana trails to help save time
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No targets damaged, mana refunded');
                return state;
            }

            // let animationDelaySum = 0;
            // let delayBetweenAnimations = delayBetweenAnimationsStart;

            for (let unit of targets) {
                if (state.casterUnit.health < state.casterUnit.healthMax) {
                    if (unit.health < 10 * quantity) {
                        state.casterUnit.health += unit.health / 2
                    }
                    else {
                        state.casterUnit.health += 5 * quantity;
                    }
                    if (state.casterUnit.health > state.casterUnit.healthMax) {
                        state.casterUnit.health = state.casterUnit.healthMax
                    }
                }
                if (!prediction) {
                    const spellEffectImage = oneOffImage(unit, animationPath, containerSpells);
                    spellEffectImage
                };
                Unit.takeDamage({ unit, amount: 10 * quantity, sourceUnit: state.casterUnit, fromVec2: state.casterUnit }, underworld, prediction);
            }
            state.casterUnit.health -= state.casterUnit.health % 1
            if (!prediction && !globalThis.headless) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 400);
                })
            }
            return state;
        },
    },
};
export default spell;
