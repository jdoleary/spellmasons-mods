/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
const {
    cardUtils,
    commonTypes,
    cards,
    cardsUtil,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { oneOffImage, playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'Ensnare';
//const animationPath = 'owoWIP'; //TODO
//const imageName = 'spellmasons-mods/Wodes_grimoire/IconWIP.png'; //TODO
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Curses,
        supportQuantity: true,
        manaCost: 20,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.SPECIAL], 
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconEnsnare.png', //TODO
        //animationPath,
        sfx: '', //TODO
        description: [`Prevents the target from moving. Furthur casts increase duration.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            //Only filter unit thats are alive and can attack. u.unitSubType[3] presumed SUPPORT_CLASS, figure out later even needed
            const targets = state.targetedUnits.filter(u => u.alive);
            //Play for client
            if (targets.length) {
                if (!prediction && !globalThis.headless) {
                    setTimeout(() => {
                        playDefaultSpellSFX(card, prediction);
                        for (let unit of targets) {
                            //TODO: check if oneOffImage is even right, took from undead blade. but addOneOffAnimation might fit better
                            //const spellEffectImage = oneOffImage(unit, animationPath, containerSpells);
                            Unit.addModifier(unit, card.id, underworld, prediction, quantity);
                        }
                    }, 100) //TODO when animation is determined
                } else {
                    for (let unit of targets) {
                        Unit.addModifier(unit, card.id, underworld, prediction, quantity);
                    }
                }
            }
            //Refund if targets no one that can attack
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No target, mana refunded')
            }
            if (!prediction && !globalThis.headless) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 100); //Very unfamiliar with promises and async functions. 
                })
            }
            return state;
        }
    },
    //Taken inspiration from freeze.js and bloat.js.
    modifiers: {
        add,
        remove,
        /*subsprite: {
            imageName,
            alpha: 1.0,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
            scale: {
                x: 0.25, //TODO: change back to 1 after WIP is changed. WIP is huge, i think
                y: 0.25,
            },
        },*/

    },
    events: {
        onTurnEnd: async (unit, underworld) => {
            // Decrement how many turns left the unit is for pacify
            const modifier = unit.modifiers[cardId]; 
            if (modifier) {
                modifier.quantity--;
                if (modifier.quantity <= 0) {
                    Unit.removeModifier(unit, cardId, underworld);
                }
            }

        }
    }
};
function add(unit, underworld, prediction, quantity) {
    cardsUtil.getOrInitModifier(unit, cardId, {
        isCurse: true, quantity, persistBetweenLevels: false,
        originalstat: unit.staminaMax,
    }, () => {
        //Adds event
        if (!unit.onTurnEndEvents.includes(cardId)) {
            unit.onTurnEndEvents.push(cardId);
        }
        //Adds subsprite, also TODO
        //JImage.addSubSprite(unit.image, imageName);
        unit.stamina = 0;
        unit.staminaMax = 0;
    }); 
}
function remove(unit, underworld) {
    //Give back ability to attack when debuff is gone
    if (unit.modifiers && unit.modifiers[cardId]) {
        const originalStamina = unit.modifiers[cardId].originalstat;
        if (originalStamina && unit.staminaMax == 0){
            unit.staminaMax = originalStamina;
        }
    }
}
export default spell;