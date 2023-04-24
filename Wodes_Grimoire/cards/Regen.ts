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

const cardId = 'Regenerate';
//const animationPath = 'owoWIP'; //TODO
//const imageName = 'spellmasons-mods/Wodes_grimoire/spelliconRegen.png'; //TODO
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Blessings,
        supportQuantity: true,
        manaCost: 20,
        healthCost: 0,
        expenseScaling: 2,
        probability: probabilityMap[CardRarity.SPECIAL], 
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconRegen.png', //TODO
        //animationPath,
        sfx: 'heal', //TODO
        description: [`Heals the target for 10 health at the end of their turn for 5 turns. Stacks increase the amount and refresh the duration.`],
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
                            Unit.addModifier(unit, card.id, underworld, prediction, 5, {amount: quantity});
                        }
                    }, 100) //TODO when animation is determined
                } else {
                    for (let unit of targets) {
                        Unit.addModifier(unit, card.id, underworld, prediction, 5, {amount: quantity}); //Duration is 5 rounds regardless of quantity
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
        onTurnEnd: async (unit, underworld) => {
            // Heal unit and decremit modifier
            const modifier = unit.modifiers[cardId];
                if (modifier) {
                    Unit.takeDamage(unit, modifier.toHeal, undefined, underworld, false);
                    modifier.quantity--;
                    updateTooltip(unit);
                    if (modifier.quantity <= 0){
                        Unit.removeModifier(unit, cardId, underworld);
                    }
                }         
        },
    }
};
let castingRegencounter = 0;
function add(unit, underworld, prediction, quantity, extra) {
    const modifier = cardsUtil.getOrInitModifier(unit, cardId, {
        isCurse: false, quantity, persistBetweenLevels: false,
        toHeal: healingAmount(extra.amount), 
    }, () => {
        //Adds event
        if (!unit.onTurnEndEvents.includes(cardId)) {
            unit.onTurnEndEvents.push(cardId);
        }
        castingRegencounter = extra.amount;
        //Adds subsprite, also TODO
        //JImage.addSubSprite(unit.image, imageName);        
    }); 
    if (modifier.quantity > 5){
        modifier.quantity = 5; //All casts give 5 turns, the max duration. When over 5, a new cast was done so update stacks
        if (extra.amount > 0 && !prediction){
            castingRegencounter += extra.amount;  
            modifier.toHeal = healingAmount(castingRegencounter); //check how many stacks there are, then give new healing value
        }
    }
    if(!prediction){
        updateTooltip(unit);
    }
}
function healingAmount(castquantity: number){
    let healing = -10;
    if (castquantity > 0){
        healing = castquantity * -10;
    }
    return healing;
}
function remove(){
    castingRegencounter = 0;
}
function updateTooltip(unit){
    if (unit.modifiers[cardId]){
        unit.modifiers[cardId].tooltip = `Healing ${-unit.modifiers[cardId].toHeal} over ${unit.modifiers[cardId].quantity} turns`
    }
}
export default spell;