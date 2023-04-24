/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';

const {
    cardUtils,
    commonTypes,
    PlanningView,
} = globalThis.SpellmasonsAPI;

const { drawUICircle } = PlanningView;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { oneOffImage, playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'FlameStrike';
//const animationPath = 'owoWIP'; //TODO
//const imageName = 'spellmasons-mods/Wodes_grimoire/IconWIP.png'; //TODO
const damageMain = 40;
const damageSplash = 10;
const splashRadius = 64; //Is also Collison mesh * 2 (64)
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Damage,
        supportQuantity: true,
        manaCost: 40,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/Wodes_grimoire/graphics/icons/spelliconFlameStrike.png',
        //animationPath,
        sfx: 'burst', //TODO
        description: [`Deals ${damageMain} damage to the target and ${damageSplash} damage to nearby targets in a small area.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            let animationDelaySum = 0;
            let delayBetweenAnimations = 400;
            //Living units
            const targets = state.targetedUnits.filter(u => u.alive);
            const adjustedRadius = splashRadius + state.aggregator.radius;
            // Note: quantity loop should always be INSIDE of the targetedUnits loop
            // so that any quantity-based animations will play simultaneously on multiple targets
            // but sequentially within themselves (on a single target, e.g. multiple hurts over and over)
            for (let q = 0; q < quantity; q++) {
                if (!prediction && !globalThis.headless) {
                    setTimeout(() => {
                        playDefaultSpellSFX(card, prediction);
                        for (let unit of targets) {
                            const explosionTargets = underworld.getUnitsWithinDistanceOfTarget(unit, adjustedRadius, prediction);
                            //const spellEffectImage = oneOffImage(unit, animationPath, containerSpells); //figure this our
                            setTimeout(() => {
                                //Does spell effect for client
                                Unit.takeDamage(unit, damageMain, state.casterUnit, underworld, prediction, state);
                                explosionTargets.splice(1).forEach(unit => {
                                    Unit.takeDamage(unit, damageSplash, undefined, underworld, prediction, state);
                                });
                            }, 100)
                        }
                    }, animationDelaySum)
                       //This exsists soley for the fact itll make the effect state wait for code to finish before moving on.
                        animationDelaySum += delayBetweenAnimations;
                } else {
                    for (let unit of targets) {
                        //Does spell effect for underworld
                        const explosionTargets = underworld.getUnitsWithinDistanceOfTarget(unit, adjustedRadius, prediction);
                        if(prediction){
                            drawUICircle(unit, adjustedRadius, 13981270); //13981270 is healthRed from color ui
                        }
                        Unit.takeDamage(unit, damageMain, state.casterUnit, underworld, prediction, state);
                        explosionTargets.splice(1).forEach(unit => {
                            Unit.takeDamage(unit, damageSplash, undefined, underworld, prediction, state);
                        });
                    }
                }
            }
            //No refund because theres no special filter.
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
