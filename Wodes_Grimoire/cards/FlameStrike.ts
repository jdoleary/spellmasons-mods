/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
import { makeFlameStrikeWithParticles } from '../graphics/ParticleCollection';

const {
    cardUtils,
    commonTypes,
    PlanningView,
    cards,
} = globalThis.SpellmasonsAPI;

const { drawUICircle } = PlanningView;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { playDefaultSpellSFX } = cardUtils;
const { refundLastSpell } = cards;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'FlameStrike';
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
        thumbnail: 'spellmasons-mods/Wodes_Grimoire/graphics/icons/spelliconFlameStrike.png',
        sfx: 'burst',
        description: [`Deals ${damageMain} damage to the target and ${damageSplash} damage to nearby targets in a small area.`],
        timeoutMs: 400,
        effect: async (state, card, quantity, underworld, prediction) => {
            //Using await new Promise instead of the other way spells work to force
            //Flamestrike to finish before continue to the next spell.
            //There MUST be a resolve for the spell to continue
            await new Promise<void>((resolve) => {
                //Living units
                const targets = state.targetedUnits.filter(u => u.alive);
                const adjustedRadius = getAdjustedRadius(state.aggregator.radiusBoost);
                if (targets.length == 0) {
                    refundLastSpell(state, prediction);
                    resolve();
                }
                for (let unit of targets) {
                    const explosionTargets = underworld.getUnitsWithinDistanceOfTarget(unit, adjustedRadius, prediction);
                    const quantityAdjustedDamageMain = damageMain * quantity;
                    const quantityAdjustedDamageSplash = damageSplash * quantity;
                    if (!prediction && !globalThis.headless) {
                        //Does spell effect for client
                        playDefaultSpellSFX(card, prediction);
                        setTimeout(() => {
                            //This setTimoue exsist to delay the damage dealt until it matches more with animation
                            explosionTargets.forEach(t => {
                                const damage = t == unit ? quantityAdjustedDamageMain : quantityAdjustedDamageSplash;
                                Unit.takeDamage({ unit: t, amount: damage, sourceUnit: state.casterUnit }, underworld, prediction)
                            });
                            resolve();
                        }, 400);
                        //This lasts 2.5 seconds
                        makeFlameStrikeWithParticles(unit, prediction);
                    } else {
                        //Does spell effect for underworld
                        if (prediction) {
                            drawUICircle(globalThis.predictionGraphics, unit, adjustedRadius, 13981270); //13981270 is healthRed from color ui
                        }
                        explosionTargets.forEach(t => {
                            const damage = t == unit ? quantityAdjustedDamageMain : quantityAdjustedDamageSplash;
                            Unit.takeDamage({ unit: t, amount: damage, sourceUnit: state.casterUnit }, underworld, prediction)
                        });
                        resolve();
                    }
                }
            });
            return state;
        },
    },
};
function getAdjustedRadius(radiusBoost: number = 0) {
    // +50% radius per radius boost
    return splashRadius * (1 + (0.5 * radiusBoost));
}
export default spell;