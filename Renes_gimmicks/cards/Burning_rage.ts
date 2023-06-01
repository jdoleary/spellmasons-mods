/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
const {
    PixiUtils,
    cardUtils,
    commonTypes,
    cards,
    cardsUtil,
    FloatingText,
    JImage
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const damageMultiplier = 8;
const attackMultiplier =5;

const cardId = 'Burning Rage';
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Curses,
        supportQuantity: true,
        manaCost: 35,
        healthCost: 0,
        expenseScaling: 2,
        probability: probabilityMap[CardRarity.RARE], 
        thumbnail: 'spellmasons-mods/Renes_gimmicks/graphics/icons/Burninig_rage.png',
        sfx: 'poison',
        description: [`Causes the target to take damage equal to the number of stacks * ${damageMultiplier}, but also new stacks increase damage by ${attackMultiplier}. Staks increase each turn`],
        effect: async (state, card, quantity, underworld, prediction) => {
            //Only filter unit thats are alive
            const targets = state.targetedUnits.filter(u => u.alive);
            //Refund if targets no one that can attack
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No target, mana refunded')
            } else {
                if (!prediction){
                    playDefaultSpellSFX(card, prediction);
                }
                for (let unit of targets) {
                    Unit.addModifier(unit, card.id, underworld, prediction, quantity);
                    unit.damage += quantity * attackMultiplier;
                }
            }
            if (!prediction && !globalThis.headless) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 100);  
                })
            }
            return state;
        },
    },
    modifiers: {
        add,
        remove,
    },
    events: {
        onTurnStart: async (unit, prediction, underworld) => {
            // Damage unit and increment modifier counter
            const modifier = unit.modifiers[cardId]; 
            if (modifier && !prediction) {
                Unit.takeDamage(unit, modifier.quantity * damageMultiplier, undefined, underworld, prediction);
                FloatingText.default({
                    coords: unit, 
                    text: `${Math.pow(modifier.quantity, 2)} rage damage`,
                    style: {fill: 'red', strokeThickness: 1}
                });
                unit.damage += attackMultiplier;
                modifier.quantity++;
            }
            return false;
        }
    }
};
function add(unit, underworld, prediction, quantity) {
    cardsUtil.getOrInitModifier(unit, cardId, {
        isCurse: true, quantity, persistBetweenLevels: false,
    }, () => {
        //Adds event
        if (!unit.onTurnStartEvents.includes(cardId)) {
            unit.onTurnStartEvents.push(cardId);
        }
    }); 
}
function remove(unit, underworld) {
    unit.damage -= unit.modifiers[cardId].quantity*attackMultiplier;
    unit.damage = Math.max(unit.damage,0);
}
export default spell;