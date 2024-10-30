import type { ICard } from '../../types/cards';
import type { Vec2 } from '../../types/jmath/Vec';
const targetSimilarId = "Target Similar";
import type Underworld from "../../types/Underworld";
import type { EffectState, Spell } from '../../types/cards';
const {
  commonTypes,
  cards,
  config,
  math,
  colors,
  JAudio,
  Unit
} = globalThis.SpellmasonsAPI;

const { addTarget } = cards;
const { distance } = math;
const { CardCategory, probabilityMap, CardRarity, UnitSubType } = commonTypes;

export const targetAllyId = 'Target Ally';
const targetsPerQuantity = 2;
const spell: Spell = {
  card: {
    id: targetAllyId,
    category: CardCategory.Targeting,
    supportQuantity: true,
    requires: [targetSimilarId],
    manaCost: 35,
    healthCost: 0,
    expenseScaling: 1,
    probability: probabilityMap[CardRarity.RARE],
    thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/TargetAlly.png',
    requiresFollowingCard: true,
    description: `Target the closest ally. ${targetsPerQuantity} per stack.`,
    allowNonUnitTarget: true,
    effect: async (state: EffectState, card: ICard, quantity: number, underworld: Underworld, prediction: boolean, outOfRange?: boolean) => {

      const faction = state.casterUnit.faction;
      // Only target units of the same faction as the caster (player's faction)
      const addedTargets = underworld.getPotentialTargets(prediction)
        .filter(u =>
          Unit.isUnit(u) &&
          u.unitSubType != UnitSubType.DOODAD &&
          u.faction == faction &&
          u !== state.casterUnit &&
          !state.targetedUnits.includes(u))
        // Sort by most missing health, and then dist to caster
        .sort((a, b) =>
          distance(state.casterPositionAtTimeOfCast, a) - distance(state.casterPositionAtTimeOfCast, b))
        .slice(0, targetsPerQuantity * quantity);

      if (addedTargets.length) {
        for (const target of addedTargets) {
          addTarget(target, state, underworld, prediction);
        }
        if (!prediction && !globalThis.headless) {
          JAudio.playSFXKey('targeting');
          await animateTargetAlly(addedTargets);
        }
      }

      return state;
    },
  }
};

export async function animateTargetAlly(newTargets: Vec2[]) {
  const animationDelay = 600; //ms
  await new Promise<void>((resolve) => {
    for (let target of newTargets) {
      if (globalThis.predictionGraphicsGreen) {
        globalThis.predictionGraphicsGreen.lineStyle(2, colors.targetingSpellGreen, 1.0)
        //playSFXKey('targetAquired');
        globalThis.predictionGraphicsGreen.drawCircle(target.x, target.y, config.COLLISION_MESH_RADIUS);
        // Show the targeting circle for a moment
        setTimeout(resolve, animationDelay);
      } else {
        resolve();
      }
    }
  });

  globalThis.predictionGraphicsGreen?.clear();

  return;
}

export default spell;