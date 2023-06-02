/// <reference path="../../globalTypes.d.ts" />
import type { Spell } from '../../types/cards/index';

const {
    particleEmitter,
    Particles,
    PixiUtils,
    cardUtils,
    commonTypes,
    cards,
    cardsUtil,
    FloatingText,
} = globalThis.SpellmasonsAPI;

function makeBurningRageParticles(follow, prediction: boolean, underworld) {
    if (prediction || globalThis.headless) {
        // Don't show if just a prediction or running on the server (globalThis.headless)
        return;
    }
    const texture = Particles.createParticleTexture();
    if (!texture) {
        Particles.logNoTextureWarning('makeBurningRageParticles');
        return;
    }
    const particleConfig =
        particleEmitter.upgradeConfig({
            autoUpdate: true,
            "alpha": {
                "start": 1,
                "end": 0
            },
            "scale": {
                "start": 1,
                "end": 0.25,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#9e1818",
                "end": "#ffee00"
            },
            "speed": {
                "start": 20,
                "end": 60,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": -50
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 265,
                "max": 275
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 1,
                "max": 1.5
            },
            "blendMode": "normal",
            "frequency": 0.45,
            "emitterLifetime": -1,
            "maxParticles": 20,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 25
            }
        }, [texture]);
    if (PixiUtils.containerUnits) {
        const wrapped = Particles.wrappedEmitter(particleConfig, PixiUtils.containerUnits);
        if (wrapped) {
            const { container, emitter } = wrapped;
            underworld.particleFollowers.push({
                displayObject: container,
                emitter,
                target: follow
            })
        } else {
            console.error('Failed to create BurnigRage particle emitter');
        }
    } else {
        return;
    }
    //Particles.simpleEmitter(position, config, () => { }, Particles.containerParticlesUnderUnits);
}

const { refundLastSpell } = cards;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const damageMultiplier = 8;
const attackMultiplier =5;

const cardId = 'Burning Rage';
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Curses,
        supportQuantity: true,
        manaCost: 35,
        healthCost: 0,
        expenseScaling: 2,
        probability: probabilityMap[CardRarity.RARE], 
        thumbnail: 'spellmasons-mods/Renes_gimmicks/graphics/icons/Burninig_rage.png',
        sfx: 'poison',
        description: [`Each stack causes target to take ${damageMultiplier} damage, but also increases damage done by ${attackMultiplier}. Staks increase each turn`],
        effect: async (state, card, quantity, underworld, prediction) => {
            //Only filter unit thats are alive
            const targets = state.targetedUnits.filter(u => u.alive);
            //Refund if targets no one that can attack
            if (targets.length == 0) {
                refundLastSpell(state, prediction, 'No target, mana refunded')
            } else {
                if (!prediction){
                    playDefaultSpellSFX(card, prediction);
                }
                for (let unit of targets) {
                    Unit.addModifier(unit, card.id, underworld, prediction, quantity);
                    unit.damage += quantity * attackMultiplier;
                }
            }
            if (!prediction && !globalThis.headless) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 100);  
                })
            }
            return state;
        },
    },
    modifiers: {
        add,
        remove,
    },
    events: {
        onTurnStart: async (unit, prediction, underworld) => {
            // Damage unit and increment modifier counter
            const modifier = unit.modifiers[cardId]; 
            if (modifier && !prediction) {
                Unit.takeDamage(unit, modifier.quantity * damageMultiplier, undefined, underworld, prediction);
                FloatingText.default({
                    coords: unit, 
                    text: `${Math.pow(modifier.quantity, 2)} rage damage`,
                    style: {fill: 'red', strokeThickness: 1}
                });
                unit.damage += attackMultiplier;
                modifier.quantity++;
            }
            return false;
        }
    }
};
function add(unit, underworld, prediction, quantity) {
    cardsUtil.getOrInitModifier(unit, cardId, {
        isCurse: true, quantity, persistBetweenLevels: false,
    }, () => {
        //Adds event
        if (!unit.onTurnStartEvents.includes(cardId)) {
            unit.onTurnStartEvents.push(cardId);
        }
        makeBurningRageParticles(unit, prediction, underworld);
    }); 
}
function remove(unit, underworld) {
    unit.damage -= unit.modifiers[cardId].quantity*attackMultiplier;
    unit.damage = Math.max(unit.damage,0);
}
export default spell;