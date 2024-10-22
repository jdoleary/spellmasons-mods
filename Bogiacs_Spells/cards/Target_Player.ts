import { ICard } from '../../types/cards/./index';
import { Vec2 } from '../../types/jmath/Vec';
import Underworld from "../../types/Underworld";
import { EffectState, Spell } from '../../types/cards/./index';
import { targetAllyId } from './Target_Ally';
const {
  commonTypes,
  cards,
  config,
  math,
  colors,
  Unit,
  JAudio
} = globalThis.SpellmasonsAPI;

const { addTarget } = cards;
const { distance } = math;
const { CardCategory, probabilityMap, CardRarity, UnitSubType } = commonTypes;


export const targetPlayerId = 'Target Player';
const targetsPerQuantity = 2;
const PLAYER_CONTROLLED = 0;
const spell: Spell = {
  card: {
    id: targetPlayerId,
    category: CardCategory.Targeting,
    supportQuantity: true,
    requires: [targetAllyId],
    manaCost: 35,
    healthCost: 0,
    expenseScaling: 1,
    probability: probabilityMap[CardRarity.RARE],
    thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/TargetPlayer.png',
    requiresFollowingCard: true,
    description: `Target the closest Player.`,
    allowNonUnitTarget: true,
    effect: async (state: EffectState, card: ICard, quantity: number, underworld: Underworld, prediction: boolean, outOfRange?: boolean) => {

      // Only target units of the same faction as the caster (player's faction)
      const addedTargets = underworld.getPotentialTargets(prediction)
        .filter(u =>
          Unit.isUnit(u) &&
          u.unitSubType != UnitSubType.DOODAD &&
          // Target players only
          u.unitType == PLAYER_CONTROLLED &&
          // Filter out caster Unit since they are naturPlayer
          // the "closest" to themselves and if they want to target
          // themselves they can by casting on themselves and wont
          // need target Player to do it
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
          await animateTargetPlayer(addedTargets);
        }
      }

      return state;
    },
  }
};

export async function animateTargetPlayer(newTargets: Vec2[]) {
  const animationDelay = 600; //ms
  await new Promise<void>((resolve) => {
    for (let target of newTargets) {
      if (globalThis.predictionGraphics) {
        globalThis.predictionGraphics.lineStyle(2, colors.targetingSpellGreen, 1.0)
        //playSFXKey('targetAquired');
        globalThis.predictionGraphics.drawCircle(target.x, target.y, config.COLLISION_MESH_RADIUS);
        // Show the targeting circle for a moment
        setTimeout(resolve, animationDelay);
      } else {
        resolve();
      }
    }
  });

  globalThis.predictionGraphics?.clear();

  return;
}

export default spell;