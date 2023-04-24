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

const cardId = 'Grace';
//const animationPath = 'owoWIP'; //TODO
//const imageName = 'spellmasons-mods/Wodes_grimoire/IconWIP.png'; //TODO
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
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconGrace.png', //TODO
        //animationPath,
        sfx: 'purify', //TODO
        description: [`Heals the target for ${-healingAmount} after 3 turns. Stacks increase the amount, but do not change duration`],
        effect: async (state, card, quantity, underworld, prediction) => {
            //Only filter unit thats are alive
            const targets = state.targetedUnits.filter(u => u.alive);
            //Play for client
            if (targets.length) {
                if (!prediction && !globalThis.headless) {
                    setTimeout(() => {
                        playDefaultSpellSFX(card, prediction);
                        for (let unit of targets) {
                            //TODO: check if oneOffImage is even right, took from undead blade. but addOneOffAnimation might fit better
                            //const spellEffectImage = oneOffImage(unit, animationPath, containerSpells);
                            Unit.addModifier(unit, card.id, underworld, prediction, 0, {amount: quantity});
                        }
                    }, 100) //TODO when animation is determined
                } else {
                    for (let unit of targets) {
                        Unit.addModifier(unit, card.id, underworld, prediction, 0, {amount: quantity}); //Duration is 5 rounds regardless of quantity
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
        onTurnStart: async (unit, prediction, underworld) => {
            // Heal unit and decremit modifier
            const modifier = unit.modifiers[cardId];
            if (modifier) {
                modifierGraceCountdown--;
                updateTooltip(unit);
                if (modifierGraceCountdown <= 0){
                    Unit.removeModifier(unit, cardId, underworld);
                }
            }   
            return false;        
        }
    }
};
let castingGracecounter = 0;
let modifierGraceCountdown = 0;
function add(unit, underworld, prediction, quantity, extra) {
    //Initilizes function?
    cardsUtil.getOrInitModifier(unit, cardId, {
        isCurse: false, quantity, persistBetweenLevels: false,
    }, () => {
        //Adds event
        if (!unit.onTurnStartEvents.includes(cardId)) {
            unit.onTurnStartEvents.push(cardId);
        }
        //Adds subsprite, also TODO
        //JImage.addSubSprite(unit.image, imageName); 
        if (modifierGraceCountdown === 0){
            modifierGraceCountdown = 3;
        }
    });
    if (extra.amount > 0 && !prediction){
        castingGracecounter += extra.amount;     
    }
    if (!prediction){
        updateTooltip(unit);
    }
}
function remove(unit, underworld){
    Unit.takeDamage(unit, castingGracecounter * healingAmount, undefined, underworld, false);
    modifierGraceCountdown = 0;
    castingGracecounter = 0;
}
function updateTooltip(unit){
    if (unit.modifiers[cardId]){
        unit.modifiers[cardId].tooltip = `${modifierGraceCountdown} turns until healed for ${castingGracecounter * -healingAmount}`
    }
}
export default spell;