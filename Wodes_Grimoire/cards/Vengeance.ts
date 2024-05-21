/// <reference path="../../globalTypes.d.ts" />
import type { EffectState, Spell } from '../../types/cards/index';

const {
    cardUtils,
    commonTypes,
    cards,
    Particles,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'Vengeance';
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Damage,
        supportQuantity: true,
        manaCost: 15,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/Wodes_Grimoire/graphics/icons/spelliconVengeance.png',
        sfx: 'hurt',
        description: [`Deals damage equal to your missing health. This harms you first if you are targeted, then enemies.`],
        timeoutMs: 20,
        effect: async (state, card, quantity, underworld, prediction) => {
            let promises: any[] = [];
            //Living units
            const targets = state.targetedUnits.filter(u => u.alive);
            //Pushes caster to the front if they are a target, so it gives best vengancing (most damage)
            let [potentialCaster] = targets.filter(u => u == state.casterUnit);
            if (!!potentialCaster && targets[0] != state.casterUnit) {
                targets.splice(targets.indexOf(state.casterUnit), 1);
                targets.unshift(state.casterUnit);
            }
            //Refund if no targets, this is before mana trails to help save time
            if (targets.length == 0 || (state.casterUnit.health == state.casterUnit.healthMax)) {
                refundLastSpell(state, prediction, 'No targets damaged, mana refunded');
                return state;
            }
            //Attaches particles to be carried out
            for (let unit of targets) {
                const manaTrailPromises: any[] = [];
                if (!prediction) {
                    for (let i = 0; i < quantity; i++) {
                        // Red vengance particle trail
                        manaTrailPromises.push(Particles.makeManaTrail(state.casterUnit, unit, underworld, '#ef4242', '#400d0d', targets.length * quantity));
                    }
                }
                promises.push((prediction ? Promise.resolve() : Promise.all(manaTrailPromises)));
            }
            //Happens when animations are done
            await Promise.all(promises).then(() => {
                if (!prediction && !globalThis.headless) {
                    playDefaultSpellSFX(card, prediction);
                }
                //Quantity is not passed into the function so that vengance can change its damage mid cast (ex. vengance hits self, second vengange then does more)
                for (let q = 0; q < quantity; q++) {
                    for (let unit of targets) {
                        //Does spell effect for underworld
                        Unit.takeDamage({ unit, amount: damageDone(state), sourceUnit: state.casterUnit, fromVec2: state.casterUnit }, underworld, prediction);
                    }
                }
            });
            return state;
        },
    },
};
function damageDone(state: EffectState) {
    //This is made into a function so it also changes damage mid cast.
    let damageMain = state.casterUnit.healthMax - state.casterUnit.health;
    damageMain = Math.max(0, damageMain); //Prevents healing
    return damageMain;
}
export default spell;
