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
        sfx: 'hurt',
        description: [`Deals 10 and drains up to 5 health (not affected by blood curse)`],
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
                if (state.casterUnit.health < state.casterUnit.healthMax){
                    if (unit.health < 10 * quantity){
                        state.casterUnit.health += unit.health/2
                    }
                    else{
                        state.casterUnit.health += 5*quantity;
                    }
                    if (state.casterUnit.health > state.casterUnit.healthMax){
                        state.casterUnit.health = state.casterUnit.healthMax
                    }
                }
                Unit.takeDamage(unit, 10 * quantity, state.casterUnit, underworld, prediction, state);
                //Unit.takeDamage(unit, heal, undefined, underworld, prediction, state);
            }
            state.casterUnit.health -= state.casterUnit.health%1
            return state;
        },
    },
};
export default spell;
