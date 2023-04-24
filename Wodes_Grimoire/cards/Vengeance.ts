/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';

const {
    cardUtils,
    commonTypes,
    cards
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { oneOffImage, playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'Vengeance';
//const animationPath = 'owoWIP'; //TODO
//const imageName = 'spellmasons-mods/Wodes_grimoire/IconWIP.png'; //TODO
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Damage,
        supportQuantity: false,
        manaCost: 15,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconVengeance.png',
        //animationPath,
        sfx: 'hurt', //TODO
        description: [`Deals damage equal to your missing health.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            let animationDelaySum = 0;
            let delayBetweenAnimations = 400;
            //Living units
            const targets = state.targetedUnits.filter(u => u.alive);
            // Note: quantity loop should always be INSIDE of the targetedUnits loop
            // so that any quantity-based animations will play simultaneously on multiple targets
            // but sequentially within themselves (on a single target, e.g. multiple hurts over and over)
            for (let q = 0; q < quantity; q++) {
                if (!prediction && !globalThis.headless) {
                    setTimeout(() => {
                        playDefaultSpellSFX(card, prediction);
                        for (let unit of targets) {
                            //const spellEffectImage = oneOffImage(unit, animationPath, containerSpells); //figure this out
                            setTimeout(() => {
                                //Does spell effect for client
                                Unit.takeDamage(unit, damageDone(state), state.casterUnit, underworld, prediction, state);
                            }, 100)
                        }
                    }, animationDelaySum)
                    //This exsists soley for the fact itll make the effect state wait for code to finish before moving on.
                    animationDelaySum += delayBetweenAnimations;
                } else {
                    for (let unit of targets) {
                        //Does spell effect for underworld
                        Unit.takeDamage(unit, damageDone(state), state.casterUnit, underworld, prediction, state);
                    }
                }
            }
            //Refund if no targets
            if (targets.length == 0 || (state.casterUnit.health == state.casterUnit.healthMax)) {
                refundLastSpell(state, prediction, 'No targets damaged, mana refunded');
            }
            //Resolves animations for client
            if (!prediction && !globalThis.headless) {
                await new Promise((resolve) => {
                    setTimeout(resolve, animationDelaySum);
                })
            }
            return state;
        },
    },
};
function damageDone(state) {
    //This is made into a function so it also changes damage mid cast.
    let damageMain = state.casterUnit.healthMax - state.casterUnit.health;
    damageMain = Math.max(0, damageMain); //Prevents healing
    return damageMain;
}
export default spell;
