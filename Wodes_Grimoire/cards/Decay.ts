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

const cardId = 'Decay';
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Curses,
        supportQuantity: true,
        manaCost: 35,
        healthCost: 0,
        expenseScaling: 2,
        probability: probabilityMap[CardRarity.RARE], 
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconDecay.png',
        sfx: 'poison',
        description: [`Causes the target to take damage equal to the number of decay stacks squared at the start of their turn. The target then gains another stack.`],
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
    },
    events: {
        onTurnStart: async (unit, prediction, underworld) => {
            // Damage unit and increment modifier counter
            const modifier = unit.modifiers[cardId]; 
            if (modifier && !!Math.pow(modifier.quantity, 2) && !prediction) {
                Unit.takeDamage(unit, Math.pow(modifier.quantity, 2), undefined, underworld, prediction);
                FloatingText.default({
                    coords: unit, 
                    text: `${Math.pow(modifier.quantity, 2)} decay damage`,
                    style: {fill: '#525863', strokeThickness: 1}
                });
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
        //Adds subsprite, also TODO
        //JImage.addSubSprite(unit.image, imageName);
    }); 
}
export default spell;