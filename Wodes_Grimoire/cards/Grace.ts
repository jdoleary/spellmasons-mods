/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
const {
    cardUtils,
    commonTypes,
    cards,
    cardsUtil,
    JImage,
    JAudio,
    FloatingText
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'Grace';
var healingAmount = -40;
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Blessings,
        supportQuantity: true,
        manaCost: 20,
        healthCost: 0,
        expenseScaling: 1,
        probability: probabilityMap[CardRarity.RARE],
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconGrace.png',
        sfx: 'purify', //TODO
        description: [`Heals the target for ${-healingAmount} after 3 turns. Stacks increase the amount, but do not change duration`],
        effect: async (state, card, quantity, underworld, prediction) => {
            //Only filter unit thats are alive
            const targets = state.targetedUnits.filter(u => u.alive);
            //Refund if targets no one that can attack
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No target, mana refunded')
            } else {
                if (!prediction) {
                    playDefaultSpellSFX(card, prediction);
                }
                for (let unit of targets) {
                    Unit.addModifier(unit, card.id, underworld, prediction, 0, { amount: quantity }); //Duration is 5 rounds regardless of quantity
                }
            }
            return state;
        }
    },
    modifiers: {
        add,
    },
    events: {
        onTurnStart: async (unit, prediction, underworld) => {
            // Heal unit and decremit modifier
            const modifier = unit.modifiers[cardId];
            if (modifier) {
                modifier.graceCountdown--;
                updateTooltip(unit);
                if (modifier.graceCountdown <= 0) {
                    let healing = calculateGraceHealing(modifier.graceQuantity);
                    Unit.takeDamage(unit, healing, undefined, underworld, false);
                    if (!prediction) {
                        FloatingText.default({
                            coords: unit,
                            text: `Grace +${-healing} health`,
                            style: { fill: '#40a058', strokeThickness: 1 }
                        });
                        JImage.addOneOffAnimation(unit, 'spell-effects/potionPickup', {}, { animationSpeed: 0.3, loop: false });
                        JAudio.playSFXKey('potionPickupHealth');
                    }
                    Unit.removeModifier(unit, cardId, underworld);
                }
            }
            return false;
        }
    }
};
function add(unit, underworld, prediction, quantity, extra) {
    const modifier = cardsUtil.getOrInitModifier(unit, cardId, {
        isCurse: false, quantity, persistBetweenLevels: false,
    }, () => {
        // Register onTurnStart event
        if (!unit.onTurnStartEvents.includes(cardId)) {
            unit.onTurnStartEvents.push(cardId);
        }
    });

    if (!modifier.graceCountdown) {
        modifier.graceCountdown = 3;
    }
    modifier.graceQuantity = (modifier.graceQuantity || 0) + extra.amount;
    if (!prediction) {
        updateTooltip(unit);
    }
}
function updateTooltip(unit) {
    const modifier = unit.modifiers && unit.modifiers[cardId];
    if (modifier) {
        modifier.tooltip = `${modifier.graceCountdown} turns until healed for ${-calculateGraceHealing(modifier.graceQuantity)}`
    }
}
function calculateGraceHealing(graceQuantity: number) {
    return graceQuantity * healingAmount
}
export default spell;