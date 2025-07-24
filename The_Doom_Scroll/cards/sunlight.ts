/// <reference path="../../globalTypes.d.ts" />
const {
  commonTypes,
  Unit,
  config,
  math,
  Vec,
  JPromise,
  JAudio,
  Easing,
  cardUtils,
  Angle,
  PlanningView,
  EffectsHeal,
  cards,
} = globalThis.SpellmasonsAPI
const { CardCategory, CardRarity, probabilityMap } = commonTypes;
const { distance, sortCosestTo } = math;
const { getAngleBetweenVec2s } = Vec;
const { raceTimeout } = JPromise;
const { healUnits } = EffectsHeal;
const { drawUICone, drawUIConePrediction } = PlanningView;
const { isAngleBetweenAngles } = Angle;
const { playDefaultSpellSFX } = cardUtils;
const { easeOutCubic } = Easing;
const { getCurrentTargets, defaultTargetsForAllowNonUnitTargetTargetingSpell, addTarget } = cards;
const { playSFXKey } = JAudio;
import type { Vec2 } from '../../types/jmath/Vec';
import type { Spell } from '../../types/cards';
import type { HasSpace } from '../../types/entity/Type';;
import type Underworld from '../../types/Underworld';
import type { IUnit } from '../../types/entity/Unit';

const bloodCurseCardId = "Blood Curse"
export const sunlightId = 'Sunlight';
const range = 200;
const coneAngle = Math.PI / 4
const timeoutMsAnimation = 2000;
const healAmount = 20
const spell: Spell = {
  card: {
    id: sunlightId,
    category: CardCategory.Blessings,
    supportQuantity: true,
    manaCost: 20,
    healthCost: 0,
    expenseScaling: 1,
    probability: probabilityMap[CardRarity.SPECIAL],
    thumbnail: 'spellmasons-mods/The_Doom_Scroll/graphics/spellIconSunlight.png',
    requiresFollowingCard: false,
    description: 'Heals 20 health to units in a cone originating from the caster. Deals 80 damage to blood cursed units.',
    allowNonUnitTarget: true,
    effect: async (state, card, quantity, underworld, prediction, outOfRange) => {
      // +50% depth per radius boost
            const adjustedRadiusBoost = quantity - 1 + state.aggregator.radiusBoost;
            const depth = range * (1 + (0.25 * adjustedRadiusBoost));
            // Width doubles up to 4 casts, capping at 8x multiplier: 1 > 2 > 4 > 8
            const adjustedAngle = coneAngle * Math.pow(2, Math.min(quantity, 4)) / 2;

            // Note: This loop must NOT be a for..of and it must cache the length because it
            // mutates state.targetedUnits as it iterates.  Otherwise it will continue to loop as it grows
      const projectAngle = getAngleBetweenVec2s(state.casterUnit, state.castLocation);
      const startAngle = projectAngle + adjustedAngle / 2;
      const endAngle = projectAngle - adjustedAngle / 2;
      const target = state.casterUnit;
      const animatedCones = [];
            const location = state.casterUnit;
            // Draw visual circle for prediction
            if (prediction) {
                      drawUIConePrediction(target, depth, startAngle, endAngle, 0xffffff);
                    } else {
                      animatedCones.push({ origin: state.casterUnit, coneStartPoint: target, radius: depth, startAngle, endAngle });
                    }
                    let withinRadiusAndAngle: IUnit[] = [];
                    underworld.getPotentialTargets(
                      prediction
                    ).filter(t => Unit.isUnit(t)).filter(t => {
                      return withinCone(state.casterUnit, target, depth, startAngle, endAngle, t);
                    }).filter(e => e !== state.casterUnit).forEach(u => {if (Unit.isUnit(u))withinRadiusAndAngle.push(u)});
                    // Sort by distance to cone start
                    withinRadiusAndAngle.sort(sortCosestTo(target));
                    // Add entities to target
                    withinRadiusAndAngle.forEach(e => addTarget(e, state, underworld, prediction));
            playDefaultSpellSFX(card, prediction);
            const bloodCursedUnits = withinRadiusAndAngle.filter(e => e.modifiers[bloodCurseCardId]);
            await healUnits(bloodCursedUnits, healAmount*3*quantity, state.casterUnit, underworld, prediction, state);
            await healUnits(withinRadiusAndAngle, healAmount*quantity, state.casterUnit, underworld, prediction, state);
            
            return state;
    },
  },
};
export interface Cone {
  origin: Vec2;
  coneStartPoint: Vec2;
  radius: number;
  startAngle: number;
  endAngle: number;
}
async function animate(cones: Cone[], underworld: Underworld, prediction: boolean) {
  if (globalThis.headless || prediction) {
    // Animations do not occur on headless, so resolve immediately or else it
    // will just waste cycles on the server
    return Promise.resolve();
  }
  if (cones.length == 0) {
    // Prevent this function from running if there is nothing to animate
    return Promise.resolve();
  }
  // Keep track of which entities have been targeted so far for the sake
  // of making a new sfx when a new entity gets targeted
  const entitiesTargeted: HasSpace[] = [];
  playSFXKey('targeting');
  return raceTimeout(timeoutMsAnimation, 'animatedExpand', new Promise<void>(resolve => {
    animateFrame(cones, Date.now(), entitiesTargeted, underworld, resolve)();
  })).then(() => {
    globalThis.predictionGraphicsGreen?.clear();
  });
}
const millisToGrow = 1000;
function withinCone(origin: Vec2, coneStartPoint: Vec2, radius: number, startAngle: number, endAngle: number, target: Vec2): boolean {
  // and within angle:
  const targetAngle = getAngleBetweenVec2s(coneStartPoint, target);
  const distanceToConeStart = distance(target, coneStartPoint);

  // TODO - Investigate isAngleBetweenAngles
  //temp fix for cone inversion: if angle is whole circle, just check distance.
  return distanceToConeStart <= radius
    && (isAngleBetweenAngles(targetAngle, startAngle, endAngle) || Math.abs(endAngle - startAngle) >= 2 * Math.PI);
}
function animateFrame(cones: Cone[], startTime: number, entitiesTargeted: HasSpace[], underworld: Underworld, resolve: (value: void | PromiseLike<void>) => void) {
  return function animateFrameInner() {
    if (globalThis.predictionGraphicsGreen) {
      globalThis.predictionGraphicsGreen.clear();
      const now = Date.now();
      const timeDiff = now - startTime;
      for (let cone of cones) {

        const { radius, origin, coneStartPoint, startAngle, endAngle } = cone;

        const animatedRadius = radius * easeOutCubic(Math.min(1, timeDiff / millisToGrow));

        drawUICone(globalThis.predictionGraphicsGreen, coneStartPoint, animatedRadius, startAngle, endAngle, 0xffffff);
        globalThis.predictionGraphicsGreen.endFill();
        // Draw circles around new targets
        const withinRadiusAndAngle = underworld.getPotentialTargets(
          false
        ).filter(t => {
          return withinCone(origin, coneStartPoint, animatedRadius, startAngle, endAngle, t);
        });
        withinRadiusAndAngle.forEach(v => {
          if (!entitiesTargeted.includes(v)) {
            entitiesTargeted.push(v);
            playSFXKey('targetAquired');
          }
          globalThis.predictionGraphicsGreen?.drawCircle(v.x, v.y, config.COLLISION_MESH_RADIUS);
        })
      }
      if (timeDiff > millisToGrow) {
        resolve();
        return;
      } else {
        requestAnimationFrame(animateFrame(cones, startTime, entitiesTargeted, underworld, resolve));
      }
    } else {
      resolve();
    }
  }
}
export default spell;
