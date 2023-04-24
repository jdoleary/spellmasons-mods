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

const cardId = 'Dominate';
//const animationPath = 'owoWIP'; //TODO
//const imageName = 'spellmasons-mods/Wodes_grimoire/IconWIP.png'; //TODO
const healthThreshhold = .25;
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Soul,
        supportQuantity: false,
        manaCost: 60,
        healthCost: 0,
        expenseScaling: 2.5,
        probability: probabilityMap[CardRarity.RARE],
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconDominate.png',
        //animationPath,
        sfx: 'suffocate', //TODO
        description: [`Converts an enemy to fight for you if they are below ${healthThreshhold*100}% health.`], //Wololo
        effect: async (state, card, quantity, underworld, prediction) => {
            let animationDelaySum = 0;
            //Living units, Units below threshhold, and units that are in your faction
            const targets = state.targetedUnits.filter(u => u.alive && u.health <= u.healthMax * healthThreshhold && !(u.faction = state.casterUnit.faction));
            // Note: quantity loop should always be INSIDE of the targetedUnits loop
            // so that any quantity-based animations will play simultaneously on multiple targets
            // but sequentially within themselves (on a single target, e.g. multiple hurts over and over)
            for (let unit of targets) {
                if (!prediction && !globalThis.headless) {
                    setTimeout(() => {
                        playDefaultSpellSFX(card, prediction);
                        for (let unit of targets) {
                            //const spellEffectImage = oneOffImage(unit, animationPath, containerSpells);
                            setTimeout(() => {
                                //Does spell effect for client
                                Unit.changeFaction(unit, state.casterUnit.faction);
                            }, 100)
                        }
                    }, animationDelaySum)
                } else {
                    for (let unit of targets) {
                        //Does spell effect for underworld
                        Unit.changeFaction(unit, state.casterUnit.faction);
                    }
                }
            }
            //Refund if no targets
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No low health targets to convert, mana refunded');
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
export default spell;
