/// <reference path="../../globalTypes.d.ts" />
import Underworld from '../../types/Underworld';
import type { Spell } from '../../types/cards/index';
import { IUnit } from '../../types/entity/Unit';
const {
    cardUtils,
    commonTypes,
    cards,
    cardsUtil,
    FloatingText,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'Regenerate';
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Blessings,
        supportQuantity: true,
        manaCost: 20,
        healthCost: 0,
        expenseScaling: 2,
        probability: probabilityMap[CardRarity.SPECIAL],
        thumbnail: 'spellmasons-mods/Wodes_Grimoire/graphics/icons/spelliconRegen.png',
        sfx: 'heal', //TODO
        description: [`Heals the target for 10 health at the end of their turn for 5 turns. Stacks increase the amount and refresh the duration.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            //Only filter unit thats are alive
            const targets = state.targetedUnits.filter(u => u.alive);
            //Refund if there are no targets
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No target, mana refunded')
            } else {
                if (!prediction) {
                    playDefaultSpellSFX(card, prediction);
                }
                for (let unit of targets) {
                    Unit.addModifier(unit, card.id, underworld, prediction, 5, { amount: quantity });
                }
            }
            if (!prediction && !globalThis.headless) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 100); //Very unfamiliar with promises and async functions. 
                })
            }
            return state;
        }
    },
    modifiers: {
        add,
        remove
    },
    events: {
        onTurnEnd: async (unit: IUnit, underworld: Underworld, prediction: boolean) => {
            // Heal unit and decremit modifier
            const modifier = unit.modifiers[cardId];
            if (modifier) {
                const healing = healingAmount(modifier.regenCounter)
                Unit.takeDamage({ unit, amount: healing }, underworld, prediction);
                modifier.quantity--;
                if (!prediction) {
                    updateTooltip(unit);
                    FloatingText.default({
                        coords: unit,
                        text: `Regenerate +${-healing} health`,
                        style: { fill: '#40a058', strokeThickness: 1 }
                    });
                }
                if (modifier.quantity <= 0) {
                    Unit.removeModifier(unit, cardId, underworld);
                }
            }
        },
    }
};
function remove(unit: IUnit, underworld: Underworld) {
    const modifier = unit.modifiers[cardId];
    if (modifier) {
        modifier.regenCounter = 0;
    }
}
function add(unit: IUnit, underworld: Underworld, prediction: boolean, quantity: number, extra: any) {
    const modifier = cardsUtil.getOrInitModifier(unit, cardId, {
        isCurse: false, quantity, persistBetweenLevels: false,
    }, () => {
        //Register onTurnEndEvents
        if (!unit.onTurnEndEvents.includes(cardId)) {
            unit.onTurnEndEvents.push(cardId);
        }
    });
    if (modifier.quantity > 5) {
        modifier.quantity = 5; //All casts give 5 turns, the max duration. When over 5, a new cast was done so update stacks
    }
    //if (extra.amount > 0 && !prediction){
    //    modifier.regenCounter = (modifier.regenCounter || 0) + extra.amount;
    //}
    if (!prediction) {
        modifier.regenCounter = (modifier.regenCounter || 0) + extra.amount;
        updateTooltip(unit);
    }
}
function healingAmount(castquantity: number) {
    let healing = -10;
    if (castquantity > 0) {
        healing = castquantity * -10;
    }
    return healing;
}
function updateTooltip(unit: IUnit) {
    const modifier = unit.modifiers && unit.modifiers[cardId];
    if (modifier) {
        modifier.tooltip = `Healing ${-healingAmount(modifier.regenCounter)} every ${modifier.quantity} turns`
    }
}
export default spell;