import type { UnitSource } from '../types/entity/units';
import type IUnit from '../types/entity/Unit';
import type Underworld from '../types/Underworld';
import { Mod } from '../types/types/commonTypes';
import { MultiColorReplaceFilter } from '@pixi/filter-multi-color-replace';
import { IPickup, IPickupSource } from '../types/entity/Pickup';
const {
  Projectile,
  rangedAction,
  commonTypes,
  JAudio,
  config,
  PixiUtils
} = globalThis.SpellmasonsAPI;
const { createVisualLobbingProjectile } = Projectile;
const { getBestRangedLOSTarget, rangedLOSMovement } = rangedAction;
const { UnitSubType } = commonTypes;
const { addPixiSpriteAnimated, containerUnits } = PixiUtils;
const Unit = globalThis.SpellmasonsAPI.Unit;

export const ARCHER_ID = 'Explosive Archer';
const unit: UnitSource = {
  id: ARCHER_ID,
  info: {
    description: 'explosive archer description',
    image: 'test',
    subtype: UnitSubType.RANGED_LOS,
  },
  unitProps: {
    attackRange: 500,
    manaMax: 0,
    damage: 10,
    healthMax: 40,
  },
  spawnParams: {
    probability: 5000,
    budgetCost: 2,
    unavailableUntilLevelIndex: 0,
  },
  animations: {
    idle: 'test',
    hit: 'test',
    attack: 'units/archerAttack',
    die: 'units/archerDeath',
    walk: 'units/archerWalk',
  },
  sfx: {
    damage: 'archerHurt',
    death: 'archerDeath',
  },
  init: (unit: IUnit.IUnit, underworld: Underworld) => {
    if (unit.image && unit.image.sprite && unit.image.sprite.filters) {
      unit.image.sprite.filters.push(
        new MultiColorReplaceFilter(
          [
            [0x866262, 0x4d2673], //skinLight
            [0x7c5353, 0x432164], //skinMedium
            [0x603232, 0x2c1641], //skinDark
            [0x838d9f, 0x113d5f], //loin cloth
            [0x3fc7c2, 0x113d5f], // feathers 
          ],
          0.05
        )
      );
    }
  },
  action: async (unit: IUnit.IUnit, attackTargets: IUnit.IUnit[] | undefined, underworld: Underworld, _canAttackTarget: boolean) => {
    // Archer just checks attackTarget, not canAttackTarget to know if it can attack because getBestRangedLOSTarget() will return undefined
    // if it can't attack any targets
    const attackTarget = attackTargets && attackTargets[0];
    // Attack
    if (attackTarget) {
      // Archers attack or move, not both; so clear their existing path
      unit.path = undefined;
      Unit.orient(unit, attackTarget);
      await Unit.playComboAnimation(unit, unit.animations.attack, () => {
        return createVisualLobbingProjectile(
          unit,
          attackTarget,
          'projectile/arrow',
        ).then(() => {
          JAudio.playSFXKey('explosiveArcherAttack');
          Unit.takeDamage(attackTarget, unit.damage, unit, underworld, false, undefined, { thinBloodLine: true });
          // TODO make explosion
        });

      });
    } else {
      // If it gets to this block it means it is either out of range or cannot see enemy
      await rangedLOSMovement(unit, underworld);
    }
  },
  getUnitAttackTargets: (unit: IUnit.IUnit, underworld: Underworld) => {
    const targets = getBestRangedLOSTarget(unit, underworld);
    if (targets) {
      // Normal archers can only attack one target;
      return targets.slice(0, 1);
    } else {
      return [];
    }
  }
};

const spike_damage = 30;

const example_pickup: IPickupSource = {
  imagePath: 'pickups/trap',
  animationSpeed: -config.DEFAULT_ANIMATION_SPEED,
  playerOnly: false,
  singleUse: true,
  name: 'example_mod_pickup',
  probability: 7000,
  scale: 1,
  description: ['Deals 🍞 to any unit that touches it', spike_damage.toString()],
  willTrigger: ({ unit, player, pickup, underworld }) => {
    return !!unit;
  },
  effect: ({ unit, player, pickup, prediction, underworld }) => {
    if (unit) {
      // Play trap spring animation
      if (!prediction) {
        const animationSprite = addPixiSpriteAnimated('pickups/trapAttack', containerUnits, {
          loop: false,
          animationSpeed: 0.2,
          onComplete: () => {
            if (animationSprite?.parent) {
              animationSprite.parent.removeChild(animationSprite);
            }
          }
        });
        if (animationSprite) {

          animationSprite.anchor.set(0.5);
          animationSprite.x = pickup.x;
          animationSprite.y = pickup.y;
        }
        const animationSprite2 = addPixiSpriteAnimated('pickups/trapAttackMagic', containerUnits, {
          loop: false,
          animationSpeed: 0.2,
          onComplete: () => {
            if (animationSprite2?.parent) {
              animationSprite2.parent.removeChild(animationSprite2);
            }
          }
        });
        if (animationSprite2) {
          animationSprite2.anchor.set(0.5);
          animationSprite2.x = pickup.x;
          animationSprite2.y = pickup.y;
        }

      }
      Unit.takeDamage(unit, spike_damage, unit, underworld, prediction)
    }
  }
};
const mod: Mod = {
  modName: 'Explosive Archer',
  author: 'Jordan O\'Leary',
  description: 'Adds an archer to the game that shoots explosive arrows',
  screenshot: '',
  units: [
    unit
  ],
  pickups: [
    example_pickup
  ],
  sfx: {
    'explosiveArcherAttack': ['./spellmasons-mods/explosive_archer/RPG3_FireMagic_Impact01.mp3']
  },
};
export default mod;
