/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';

const {
    commonTypes,
    cards,
    Unit,
    cardUtils,
    PixiUtils
} = globalThis.SpellmasonsAPI;

const { oneOffImage, playDefaultSpellSFX } = cardUtils;
const { refundLastSpell } = cards;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;
const { containerSpells } = PixiUtils;

const cardId = 'Limit Blast';
const animationPath = 'Limit Glove';
const healthRequirement = .30;
const baseDamage = 5;
const damageMultiplier = 10;
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Damage,
        supportQuantity: true,
        manaCost: 25,
        healthCost: 0,
        expenseScaling: 2,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/LimitGlove.png',
        animationPath,
        sfx: 'debilitate',
        description: [`Deals ${baseDamage} damage to target(s). If caster's health is ${healthRequirement * 100}% or less, deals ${baseDamage * damageMultiplier} damage instead.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            const targets = state.targetedUnits.filter(u => u.alive);
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No valid targets. Cost refunded.');
                return state;
            }
            if (!prediction && !globalThis.headless) {
                for (let unit of targets) {
                    const spellEffectImage = oneOffImage(unit, animationPath, containerSpells);
                }
                playDefaultSpellSFX(card, prediction);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            for (let unit of targets) {
                let healthReqCalc = state.casterUnit.healthMax * healthRequirement;
                let damage = baseDamage;
                if (state.casterUnit.health <= healthReqCalc) {
                    damage = damage * damageMultiplier;
                }
                Unit.takeDamage({
                    unit: unit,
                    amount: damage * quantity,
                    sourceUnit: state.casterUnit,
                    fromVec2: state.casterUnit
                }, underworld, prediction);
            }
            if (!prediction && !globalThis.headless) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            return state;
        }
    }
};
export default spell;