/// <reference path="../../globalTypes.d.ts" />
const {
  commonTypes,
  math,
  colors,
  forcePushTowards,
  cardUtils,
  cards,
  Unit,
  JAudio,
  PlanningView,
  ParticleCollection,
  Particles
} = globalThis.SpellmasonsAPI
const { CardCategory, CardRarity, probabilityMap } = commonTypes;
const { distance } = math;
const { playDefaultSpellSFX } = cardUtils
const { addTarget } = cards;
const { takeDamage } = Unit;
const { playSFXKey } = JAudio;
const { drawUICirclePrediction } = PlanningView;
const { makeParticleExplosion } = ParticleCollection;
const { createParticleTexture, logNoTextureWarning } = Particles;
import type { Vec2 } from '../../types/jmath/Vec';
import type { EffectState, Spell } from '../../types/cards';
import type Underworld from '../../types/Underworld';
import type { IUnit} from '../../types/entity/Unit';



export const targetStompCardId = 'Target Stomp';
const baseExplosionRadius = 140;
const stompMoveDistance = 100;
const stompRadius = 115;
const spell: Spell = {
  card: {
    id: targetStompCardId,
    category: CardCategory.Targeting,
    supportQuantity: true,
    allowNonUnitTarget: true,
    ignoreRange: true,
    sfx: 'stomp',
    manaCost: 10,
    healthCost: 0,
    expenseScaling: 1,
    probability: probabilityMap[CardRarity.RARE],
    thumbnail: 'spellmasons-mods/The_Doom_Scroll/graphics/spellIconTargetStomp.png',
    description: 'Jump to a location and stomp, pulling enemies towards you and adds them as a target to subsequent spells.',
    effect: async (state, card, quantity, underworld, prediction) => {
      const target = state.castLocation;

      if (target) {
        // Charge up VFX
        if (!prediction && !globalThis.headless) {
          const delayBeforeDash = 500; //ms
          playDefaultSpellSFX(card, prediction);
          makeStompWindupParticles(state.casterUnit, prediction);
          await new Promise(resolve => setTimeout(resolve, delayBeforeDash));
        }

        // Dash
        const moveDistance = Math.min(distance(state.casterUnit, target), stompMoveDistance * quantity)
        await forcePushTowards(state.casterUnit, target, moveDistance, underworld, prediction, state.casterUnit);

        // Stomp
        const radius = stompRadius * (1 + (0.25 * state.aggregator.radiusBoost));
        if (prediction) {
          // Stomp Prediction
          drawUICirclePrediction(state.casterUnit, radius, colors.errorRed, 'Stomp Radius');
        } else if (!globalThis.headless) {
          // Stomp VFX
          makeStompExplodeParticles2(state.casterUnit, radius, true, prediction);
          // BloatExplosion SFX is left here intentionally for game-feel
          playSFXKey('bloatExplosion');
        }

        // Stomp does damage * quantity and pushback = base stomp radius
        targetStompExplode(state.casterUnit, radius, 0, stompRadius, underworld, prediction, state);
      }

      return state;
    },
  },
};

// Damages and pushes away nearby enemies
async function targetStompExplode(caster: IUnit, radius: number, damage: number, pushDistance: number, underworld: Underworld, prediction: boolean, state: EffectState) {
  const units = underworld.getUnitsWithinDistanceOfTarget(caster, radius, prediction).filter(u => u.id != caster.id);

  units.forEach(u => {
    // Deal damage to units
    takeDamage({
      unit: u,
      amount: damage,
      sourceUnit: caster,
      fromVec2: caster,
    }, underworld, prediction);
  });

  units.forEach(u => {
    // Push units away from exploding location

    //forcePushAwayFrom(u, caster, pushDistance, underworld, prediction, caster);
    forcePushTowards(u, caster, pushDistance, underworld, prediction, caster);
  })

  units.forEach(u => {
    // Make particles for units
    addTarget(u, state, underworld, prediction)
});

  underworld.getPickupsWithinDistanceOfTarget(caster, radius, prediction)
    .forEach(p => {
      // Push pickups away
      forcePushTowards(p, caster, pushDistance, underworld, prediction, caster);
    })
}

// Temporary particles for Stomp implementation
function makeStompExplodeParticles2(position: Vec2, radius: number, big: boolean, prediction: boolean) {
  if (prediction || globalThis.headless) {
    // Don't show if just a prediction
    return;
  }

  const explosionSize = radius / baseExplosionRadius * (big ? 1 : 0.7);
  makeParticleExplosion(position, explosionSize, colors.trueGrey, colors.trueWhite, prediction)
}

function makeStompExplodeParticles(position: Vec2, radius: number, big: boolean, prediction: boolean) {
  if (prediction || globalThis.headless) {
    // Don't show if just a prediction
    return;
  }
  const texture = createParticleTexture();
  if (!texture) {
    logNoTextureWarning('makeStompParticleExplosion');
    return;
  }
  const config = {
    "alpha": {
      "start": 1,
      "end": 0.1
    },
    "scale": {
      "start": 2,
      "end": 1.5,
      "minimumScaleMultiplier": 0.01
    },
    "color": {
      "start": "#634d42",
      "end": "#26221f"
    },
    "speed": {
      "start": 800,
      "end": 0,
      "minimumSpeedMultiplier": 0.5
    },
    "acceleration": {
      "x": 0,
      "y": 3000
    },
    "maxSpeed": 1000,
    "startRotation": {
      "min": -110,
      "max": -70
    },
    "noRotation": false,
    "rotationSpeed": {
      "min": 0,
      "max": 0
    },
    "lifetime": {
      "min": 0.4,
      "max": 0.8
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": 0.1,
    "maxParticles": 500,
    "pos": {
      "x": 0,
      "y": 0
    },
    "addAtBack": false,
    "spawnType": "circle",
    "spawnCircle": {
      "x": 0,
      "y": 0,
      "r": 80
    }
  };
  if (big) {
    config.scale.start *= 2;
    config.scale.end *= 2;
    config.speed.start *= 1.5;
    config.lifetime.min *= 1.2;
    config.lifetime.max *= 1.2;
    config.spawnCircle.r *= 1.2;
  }
}

function makeStompWindupParticles(position: Vec2, prediction: boolean) {
  if (prediction || globalThis.headless) {
    // Don't show if just a prediction
    return;
  }
  const texture = createParticleTexture();
  if (!texture) {
    logNoTextureWarning('makeStompParticleWindup');
    return;
  }
  const config = {
    "alpha": {
      "start": 0.8,
      "end": 0.1
    },
    "scale": {
      "start": 1.5,
      "end": 1,
      "minimumScaleMultiplier": 0.01
    },
    "color": {
      "start": "#634d42",
      "end": "#26221f"
    },
    "speed": {
      "start": 200,
      "end": 0,
      "minimumSpeedMultiplier": 0.5
    },
    "acceleration": {
      "x": 0,
      "y": 100
    },
    "maxSpeed": 0,
    "startRotation": {
      "min": 175,
      "max": 185
    },
    "noRotation": false,
    "rotationSpeed": {
      "min": 0,
      "max": 0
    },
    "lifetime": {
      "min": 0.2,
      "max": 0.4
    },
    "blendMode": "normal",
    "frequency": 0.002,
    "emitterLifetime": 0.5,
    "maxParticles": 500,
    "pos": {
      "x": 0,
      "y": 16
    },
    "addAtBack": false,
    "spawnType": "ring",
    "spawnCircle": {
      "x": 0,
      "y": 0,
      "r": 80,
      "minR": 32
    }
  };
}

export default spell;
