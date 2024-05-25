/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';

const {
    cardUtils,
    commonTypes,
    cards
} = globalThis.SpellmasonsAPI;
const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'Dominate';
const healthThreshhold = .25;
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Soul,
        supportQuantity: false,
        manaCost: 60,
        healthCost: 0,
        expenseScaling: 2.5,
        probability: probabilityMap[CardRarity.RARE],
        thumbnail: 'spellmasons-mods/Wodes_Grimoire/graphics/icons/spelliconDominate.png',
        sfx: 'suffocate',
        description: [`Converts an enemy to fight for you if they are below ${healthThreshhold * 100}% health.`], //Wololo
        effect: async (state, card, quantity, underworld, prediction) => {
            //Living units, Units below threshhold, and units that are in your faction
            const targets = state.targetedUnits.filter(u => u.alive && u.health <= u.healthMax * healthThreshhold && u.faction !== state.casterUnit.faction);
            if (!prediction && !globalThis.headless) {
                playDefaultSpellSFX(card, prediction);
            }
            for (let unit of targets) {
                //Does spell effect for underworld
                Unit.changeFaction(unit, state.casterUnit.faction);
            }
            //Refund if no targets
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No low health targets to convert, mana refunded');
            }
            //No animations to resolve
            return state;
        },
    },
};
export default spell;
