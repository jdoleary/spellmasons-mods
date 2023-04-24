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

const cardId = 'Pacify';
//const animationPath = 'owoWIP'; //TODO
//const imageName = 'spellmasons-mods/Wodes_grimoire/IconWIP.png'; //TODO
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Curses,
        supportQuantity: true,
        manaCost: 20,
        healthCost: 0,
        expenseScaling: 2,
        probability: probabilityMap[CardRarity.SPECIAL], 
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconPacify.png', 
        //animationPath,
        sfx: '', //TODO
        description: [`Prevents the target from attacking. Furthur casts increase duration.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            //Only filter unit thats are alive and can attack. u.unitSubType[3] presumed SUPPORT_CLASS, cant effect summoners, prists dont attack
            const targets = state.targetedUnits.filter(u => u.alive && !(u.unitSubType == 3));
            //Play for client
            if (targets.length) {
                if (!prediction && !globalThis.headless) {
                    setTimeout(() => {
                        playDefaultSpellSFX(card, prediction);
                        for (let unit of targets) {
                            //const spellEffectImage = oneOffImage(unit, animationPath, containerSpells);
                            Unit.addModifier(unit, card.id, underworld, prediction, quantity);
                        }
                    }, 100)
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
                    setTimeout(resolve, 100); 
                })
            }
            return state;
        }
    },
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
                x: 0.25, 
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
        originalstat: unit.attackRange,
    }, () => {
        //Adds event
        if (!unit.onTurnEndEvents.includes(cardId)) {
            unit.onTurnEndEvents.push(cardId);
        }
        //Adds subsprite, also TODO
        //JImage.addSubSprite(unit.image, imageName);
        //Removes ability to attack, TODO: find a better way
        //attackTarget / attackTargets seems better, but function is invoked during action so it gets overwritten?
        unit.attackRange = 0;
    }); 
}
function remove(unit, underworld) {
    //Give back ability to attack when debuff is gone
    if (unit.modifiers && unit.modifiers[cardId]) {
        const originalRange = unit.modifiers[cardId].originalstat;
        if (originalRange && unit.attackRange == 0){
            unit.attackRange = originalRange;
        }
    }
}
export default spell;