/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';


const {
    PixiUtils,
    commonTypes,
    cards,
    cardUtils,
    Unit,
    JPromise,
} = globalThis.SpellmasonsAPI;
const { oneOffImage, playDefaultSpellSFX, playSpellSFX } = cardUtils;
const { refundLastSpell } = cards;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;
const { containerSpells } = PixiUtils;

const animationPath = 'spellGravity';
const cardId = 'Gravity';
const percentDamage = .10;

const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Damage,
        supportQuantity: true,
        manaCost: 30,
        healthCost: 0,
        expenseScaling: 2,
        probability: probabilityMap[CardRarity.RARE],
        animationPath,
        thumbnail: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/Gravity.png',
        sfx: 'pull',
        description: [`Deals damage to target(s) equal to ${percentDamage * 100}% of its current health.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            const targets = state.targetedUnits.filter(u => u.alive);
            if (!prediction && !globalThis.headless) {
                // Trigger first sfx
                playSpellSFX('push', prediction);
                let promises = [];
                for (let unit of targets) {
                    promises.push(new Promise<void>(res => {
                        oneOffImage(unit, animationPath, containerSpells, res);
                        // Trigger final sfx timed along with animation
                        setTimeout(() => {
                            playDefaultSpellSFX(card, prediction);
                        }, 1000);
                    }));
                }
                await JPromise.raceTimeout(2000, 'Gravity attack animation', Promise.all(promises));

            }
            for (let unit of targets) {
                let damage = unit.health * percentDamage * quantity;
                Unit.takeDamage({
                    unit: unit,
                    amount: damage,
                    sourceUnit: state.casterUnit,
                    fromVec2: state.casterUnit
                }, underworld, prediction);
            }
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No valid targets. Cost refunded.');
            }
            return state;
        }
    }
};
export default spell;