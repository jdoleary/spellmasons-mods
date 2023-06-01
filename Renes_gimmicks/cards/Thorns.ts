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

const cardId = 'Thorns';
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
        description: [`10`],
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
        onDamage: (unit, amount, underworld, prediction, damageDealer) => {
          const modifier = unit.modifiers[cardId];
          if (modifier) {
            if (amount > 0) {
              if (!prediction) {
                FloatingText.default({
                  coords: unit,
                  text: 'Thorns',
                  style: {fill: 'blue', strokeThickness: 1 },
                });
              }
              //console.log("Damage Dealer:",damageDealer)
              if (damageDealer != null){ //composeOnDamageEvents do not pass argument damageDealer right now
                Unit.takeDamage(damageDealer, thornsAmount(modifier.thornsCounter), undefined, underworld, prediction);
             };
              updateTooltip(unit);
            }
          } 
        return amount;
        },
      },
};

function add(unit, underworld, prediction, quantity, extra) {
    const modifier = cardsUtil.getOrInitModifier(unit, cardId, {
        isCurse: false, quantity, persistBetweenLevels: false,
    }, () => {
        //Register onTurnEndEvents
        if (!unit.onDamageEvents.includes(cardId)) {
            unit.onDamageEvents.push(cardId);
        }
    });
    if (modifier.quantity > 2) {
        modifier.quantity = 2; //All casts give 2 turns, the max duration. When over 2, a new cast was done so update stacks
    }
    if (!prediction) {
        modifier.thornsCounter = (modifier.thornsCounter || 0) + extra.amount;
        updateTooltip(unit);
    }
}
function thornsAmount(castquantity: number) {
    let thorns = 10;
    if (castquantity > 0) {
        thorns = castquantity * 10;
    }
    return thorns;
}
function updateTooltip(unit) {
    const modifier = unit.modifiers && unit.modifiers[cardId];
    if (modifier) {
        modifier.tooltip = `When attacked deal ${thornsAmount(modifier.thornsCounter)}, lasts ${modifier.quantity} turns`
    }
}
export default spell;