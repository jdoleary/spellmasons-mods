/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';
import { IUnit } from '../../types/entity/Unit';
import { Vec2 } from '../../types/jmath/Vec';
import Underworld from '../../types/Underworld';

const {
    Particles,
    ParticleCollection,
    particleEmitter,
    commonTypes,
    Unit,
    PlanningView,
    colors,
    cardUtils
} = globalThis.SpellmasonsAPI;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;
const { drawUICirclePrediction } = PlanningView;
const { playDefaultSpellSFX } = cardUtils;
const { simpleEmitter } = Particles;

const WHITE_WIND_EMITTER_NAME = "WHITE_WIND";
function makeWhiteWindParticles(position: Vec2, radius: number, underworld: Underworld, prediction: boolean) {
    if (prediction || globalThis.headless) {
        return;
    }
    const texture = Particles.createParticleTexture();
    if (!texture) {
        return;
    }
    const particleConfig =
        particleEmitter.upgradeConfig({
            "alpha": {
                "start": 1,
                "end": 0
            },
            "scale": {
                "start": 0.5,
                "end": 0.05,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": radius * 1.5,
                "end": 0,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 90,
                "max": 180
            },
            "noRotation": true,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 0.2,
                "max": 0.8
            },
            "blendMode": "add",
            "frequency": 0.001,
            "emitterLifetime": waitTime / 2.0,
            "maxParticles": 500 * radius,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "ring",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": radius,
                "minR": 0
            }
        }, [texture]);
        simpleEmitter(position, particleConfig);
}

const cardId = 'Healing Breeze';
const baseRange = 100;
const waitTime = 2;
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Blessings,
        supportQuantity: true,
        manaCost: 50,
        healthCost: 0,
        expenseScaling: 2,
        probability: probabilityMap[CardRarity.RARE],
        allowNonUnitTarget: true,
        thumbnail: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/WhiteWind.png',
        sfx: 'heal',
        description: [`Heals targets in an area around self equal to own health.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            let emitter;
            let adjustedRange = baseRange * (1 + ((quantity - 1) * 0.5) + (0.25 * state.aggregator.radiusBoost));
            if (prediction) {
                drawUICirclePrediction(state.casterUnit, adjustedRange, colors.targetingSpellGreen, 'Target Radius');
            } else {
                makeWhiteWindParticles(state.casterUnit, adjustedRange, underworld, prediction);
            }
            if (!prediction && !globalThis.headless) {
                await new Promise((resolve) => {
                    setTimeout(resolve, waitTime * 1000);
                });
            }
            let entities = underworld.getEntitiesWithinDistanceOfTarget(state.casterUnit, adjustedRange, prediction);
            for (let entity of entities) {
                if (Unit.isUnit(entity)) {
                    let target: IUnit = entity;
                    Unit.takeDamage({unit: target, amount: -state.casterUnit.health}, underworld, prediction);
                }
                playDefaultSpellSFX(card, prediction);
            }
            if (!prediction && !globalThis.headless) {
                for (let follower of underworld.particleFollowers) {
                    if (follower.emitter.name === WHITE_WIND_EMITTER_NAME && follower.target == state.casterUnit) {
                        // Remove emitter
                        ParticleCollection.stopAndDestroyForeverEmitter(follower.emitter);
                        break;
                    }
                }
            }
            return state;
        }
    }
};
export default spell;