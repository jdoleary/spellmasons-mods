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

const cardId = 'Harvest';
//const animationPath = 'owoWIP'; //TODO
//const imageName = 'spellmasons-mods/Wodes_grimoire/IconWIP.png'; //TODO
const manaRegain = 20;
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Mana,
        supportQuantity: true,
        manaCost: 0,
        healthCost: 35,
        expenseScaling: 1,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconHarvest.png',
        //animationPath,
        sfx: 'sacrifice',
        description: [`Consumes target corpse for ${manaRegain} mana.\nTastes like chicken.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            let animationDelaySum = 0;
            let totalManaHarvested = 0;
            //Corpses only
            const targets = state.targetedUnits.filter(u => !u.alive);
            // Note: quantity loop should always be INSIDE of the targetedUnits loop
            // so that any quantity-based animations will play simultaneously on multiple targets
            // but sequentially within themselves (on a single target, e.g. multiple hurts over and over)
            for (let unit of targets){
                totalManaHarvested += (manaRegain * quantity);
            }
            if (!prediction && !globalThis.headless) {
                setTimeout(() => {
                    playDefaultSpellSFX(card, prediction);
                    for (let unit of targets) {
                        //const spellEffectImage = oneOffImage(unit, animationPath, containerSpells); //figure this out
                        setTimeout(() => {
                            //Does spell effect for client
                            Unit.cleanup(unit);
                        }, 100)
                    }
                    state.casterUnit.mana += totalManaHarvested;
                }, animationDelaySum)
            } else {
                for (let unit of targets) {
                    //Does spell effect for underworld
                    Unit.cleanup(unit);
                }
                state.casterUnit.mana += totalManaHarvested;
            }
            //Refund if no targets
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No corpses, health refunded');
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
