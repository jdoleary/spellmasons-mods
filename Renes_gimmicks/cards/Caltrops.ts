/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
import { isUnit } from '../../types/entity/Unit';

const {
    cardUtils,
    commonTypes,
    cards,
    cardsUtil,
    Particles,
    FloatingText,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'Caltrops';
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Curses,
        supportQuantity: true,
        manaCost: 30,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/Renes_gimmicks/graphics/icons/'+cardId+'.png',
        sfx: 'hurt',
        description: [`Target takes damage each time it moves. Stacks, casting again replenishes duration up to 3 turns`],
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
                Unit.addModifier(unit, cardId, underworld, prediction, 2, { amount: quantity });
            }
            return state;
        },
    },
    modifiers: {
        add,
    },
    events: {
        onMove: (unit, newLocation) => {
        const modifier = unit.modifiers[cardId];
        // let dif = Math.sqrt(Math.pow((unit.x - newLocation.x),2) + Math.pow((unit.y - newLocation.y),2))
        // let dif = Math.sqrt(dif);
        console.log("Damage Dealer:",Math.sqrt(Math.pow((unit.x - newLocation.x),2) + Math.pow((unit.y - newLocation.y),2)))
            //Unit.takeDamage(damageDealer, thornsAmount(modifier.thornsCounter), undefined, underworld, prediction);
            //updateTooltip(unit);
        return newLocation;
        },
      },
};

function add(unit, underworld, prediction, quantity, extra) {
    const modifier = cardsUtil.getOrInitModifier(unit, cardId, {
        isCurse: false, quantity, persistBetweenLevels: false,
    }, () => {
        //Register onTurnEndEvents
        if (!unit.onMove.includes(cardId)) {
            unit.onMove.push(cardId);
        }
    });
    if (modifier.quantity > 3) {
        modifier.quantity = 3; //All casts give 2 turns, the max duration. When over 2, a new cast was done so update stacks
    }
    if (!prediction) {
        modifier.thornsCounter = (modifier.caltropsCounter || 0) + extra.amount;
        updateTooltip(unit);
    }
}
function caltropsAmount(castquantity: number) {
    let caltrops = 1;
    if (castquantity > 0) {
        caltrops = castquantity * 1;
    }
    return caltrops;
}
function updateTooltip(unit) {
    const modifier = unit.modifiers && unit.modifiers[cardId];
    if (modifier) {
        modifier.tooltip = `When target moves deal ${caltropsAmount(modifier.thornsCounter)} damage, lasts ${modifier.quantity} turns`
    }
}
export default spell;