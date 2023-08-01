/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';

const {
    PixiUtils,
    cardUtils,
    commonTypes,
    cards,
    FloatingText
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const { containerSpells } = PixiUtils;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { oneOffImage, playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;
const Events = globalThis.SpellmasonsAPI.Events;


const cardId = 'Fast Forward';
//const animationPath = 'owoWIP'; //TODO
//const imageName = 'spellmasons-mods/Wodes_grimoire/IconWIP.png'; //TODO
/*
This spell does NOT work well with any DOTs that deal damage at the end of the turn.
Adding in !prediction to the function of proc'ing the events means that the player wont be able to see it
But the player will also see the enemy take damage every tick and heal themselves before they cast
Need to ask Jordan if onTurnEvents can have predictions passed through or to pass predictions through without prediction variable
*/
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Soul, //Theres no "other" category
        supportQuantity: false,
        manaCost: 25,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.RARE],
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconFastForward.png',
        //animationPath,
        sfx: 'push', //TODO
        description: [`Shunt the target forward through time. Causes progression of modifiers but does not effect cooldowns.`], //TODO: better deffinition
        effect: async (state, card, quantity, underworld, prediction) => {
            //Living units
            const targets = state.targetedUnits.filter(u => u.alive);
            // Note: quantity loop should always be INSIDE of the targetedUnits loop
            // so that any quantity-based animations will play simultaneously on multiple targets
            // but sequentially within themselves (on a single target, e.g. multiple hurts over and over)
            if (!prediction && !globalThis.headless) {
                playDefaultSpellSFX(card, prediction);
                for (let unit of targets) {
                    // Delay floating text so it doesn't overlap with
                    // any floating text triggered when procEvents is invoked
                    setTimeout(() => {
                        FloatingText.default({
                            coords: unit,
                            text: `Fast Forward`,
                            style: { fill: '#ff0000', strokeThickness: 1 }
                        });
                    }, 200);
                    //const spellEffectImage = oneOffImage(unit, animationPath, containerSpells); //figure this out
                    procEvents(unit, prediction, underworld);
                }
            } else {
                for (let unit of targets) {
                    //Does spell effect for underworld
                    procEvents(unit, prediction, underworld);

                }
            }
            //Refund if no targets
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No targets chosen, mana refunded');
            }
            return state;
        },

    },
};
async function procEvents(unit, prediction, underworld) {
    //onTurnStart events first for order.
    for (let i = 0; i < unit.onTurnStartEvents.length; i++) {
        const eventName = unit.onTurnStartEvents[i];
        if (eventName) {
            //Made into function because eventName points to a modifier (probably) whose arguments need to be pass in.
            const fns = Events.default.onTurnStartSource[eventName];
            if (fns) {
                await fns(unit, prediction, underworld); //Returns boolean, but ignored.
            }
        }
    }
    for (let i = 0; i < unit.onTurnEndEvents.length; i++) {
        const eventName = unit.onTurnEndEvents[i];
        if (eventName) {
            const fne = Events.default.onTurnEndSource[eventName];
            if (fne) {
                await fne(unit, underworld, prediction);
            }
        }
    }
}
export default spell;
