/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';

const {
    cardUtils,
    commonTypes,
    cards,
    Particles,
    FloatingText,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity, UnitType } = commonTypes;

const cardId = 'Harvest';
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
        sfx: 'sacrifice',
        description: [`Consumes target corpse for ${manaRegain} mana. Does not work on player corpses.\n\nTastes like chicken.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            let promises: any[] = [];
            let totalManaHarvested = 0;
            //Corpses only. Cleaning up another player causes a crash, all players need some unit. Can't move player corpse to OoB either cause they could be res'ed in same chain
            const targets = state.targetedUnits.filter(u => !u.alive && u.unitType != UnitType.PLAYER_CONTROLLED);
            for (let unit of targets) {
                totalManaHarvested += (manaRegain * quantity);
                const manaTrailPromises: any[] = [];
                if (!prediction) {
                    for (let i = 0; i < quantity; i++) {
                        manaTrailPromises.push(Particles.makeManaTrail(unit, state.casterUnit, underworld, '#e4ffee', '#40ff66')); //Light green means souls :)
                    }
                }
                promises.push((prediction ? Promise.resolve() : Promise.all(manaTrailPromises)));
            }
            await Promise.all(promises).then(() => {
                if (!prediction && !globalThis.headless) {
                    playDefaultSpellSFX(card, prediction);
                }
                for (let unit of targets) {
                    //Does spell effect for client
                    Unit.cleanup(unit);
                }
                state.casterUnit.mana += totalManaHarvested;
            });
            //Refund if no targets
            if (targets.length == 0 && !totalManaHarvested) {
                refundLastSpell(state, prediction, 'No corpses, health refunded');
            }
            if (!prediction && !!totalManaHarvested) {
                FloatingText.default({
                    coords: state.casterUnit,
                    text: `${totalManaHarvested} Mana Harvested`,
                    style: { fill: 'blue', strokeThickness: 1 }
                });
            }
            return state;
        },
    },
};
export default spell;