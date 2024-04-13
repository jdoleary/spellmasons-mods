/// <reference path="../globalTypes.d.ts" />
import type { UnitSource } from '../types/entity/units';
import type IUnit from '../types/entity/Unit';
import type Underworld from '../types/Underworld';
import { Mod } from '../types/types/commonTypes';
import { IPickupSource } from '../types/entity/Pickup';
const {
  Projectile,
  rangedAction,
  commonTypes,
  config,
  JPromise,
  JAudio,
  PixiUtils,
  ParticleCollection,
  MultiColorReplaceFilter,
} = globalThis.SpellmasonsAPI;
const { createVisualLobbingProjectile } = Projectile;
const { getBestRangedLOSTarget, rangedLOSMovement } = rangedAction;
const { UnitSubType } = commonTypes;
const { addPixiSpriteAnimated, containerUnits } = PixiUtils;
const Unit = globalThis.SpellmasonsAPI.Unit;

export const ARCHER_ID = 'Explosive Archer';
const explosionDamage = 40;
const explosion_radius = 140;
const unit: UnitSource = {
  id: ARCHER_ID,
  info: {
    description: 'Shoot explosive arrows',
    image: 'units/archerIdle',
    subtype: UnitSubType.RANGED_LOS,
  },
  unitProps: {
    attackRange: 500,
    manaMax: 0,
    damage: 10,
    healthMax: 40,
    bloodColor: 0x432164
  },
  spawnParams: {
    probability: 50,
    budgetCost: 1,
    unavailableUntilLevelIndex: 7,
  },
  animations: {
    idle: 'units/archerIdle',
    hit: 'units/archerHit',
    attack: 'units/archerAttack',
    die: 'units/archerDeath',
    walk: 'units/archerWalk',
  },
  sfx: {
    damage: 'archerHurt',
    death: 'archerDeath',
  },
  init: (unit: IUnit.IUnit, _underworld: Underworld) => {
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
    // Get all targets but the first which will be hit by the explosion.  This is determined from within getUnitAttackTargets
    const explosionTargets = attackTargets ? attackTargets.slice(1) : [];
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
          Unit.takeDamage({ unit: attackTarget, amount: unit.damage, fromVec2: unit, thinBloodLine: true }, underworld, false);
          ParticleCollection.makeBloatExplosionWithParticles(attackTarget, 1, false);
          // Await the resolution of the forcePushes before moving on
          return JPromise.raceTimeout(3000, 'explosive archer push', Promise.all(explosionTargets.map(u => {
            // Deal damage to units
            Unit.takeDamage({ unit: u, amount: explosionDamage, fromVec2: attackTarget }, underworld, false);
            // Push units away from exploding unit
            return SpellmasonsAPI.forcePushAwayFrom(u, attackTarget, 10, underworld, false);
          })));
        });

      });
    } else {
      // If it gets to this block it means it is either out of range or cannot see enemy
      await rangedLOSMovement(unit, underworld);
    }
  },
  getUnitAttackTargets: (unit: IUnit.IUnit, underworld: Underworld) => {
    const targets = getBestRangedLOSTarget(unit, underworld);
    const target = targets[0];
    if (target) {
      const explosionTargets = underworld.getUnitsWithinDistanceOfTarget(
        target,
        explosion_radius,
        false
      );
      return [target, ...explosionTargets];
    } else {
      return [];
    }
  }
};

const spike_damage = 80;

const huge_trap: IPickupSource = {
  imagePath: 'pickups/trap',
  animationSpeed: -config.DEFAULT_ANIMATION_SPEED,
  playerOnly: false,
  name: 'Huge Trap',
  probability: 70,
  scale: 1.5,
  description: ['Deals 🍞 to any unit that touches it', spike_damage.toString()],
  willTrigger: ({ unit }) => {
    return !!unit;
  },
  effect: ({ unit, pickup, prediction, underworld }) => {
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
      Unit.takeDamage({ unit, amount: spike_damage, fromVec2: unit }, underworld, prediction)
    }
  }
};
const mod: Mod = {
  modName: 'Explosive Archer & Big Trap',
  author: 'Jordan O\'Leary',
  description: "Adds an archer that shoots explosive arrows and a large trap that does more damage.",
  screenshot: 'spellmasons-mods/explosive_archer/explosiveArcher.png',
  units: [
    unit
  ],
  pickups: [
    huge_trap
  ],
  sfx: {
    'explosiveArcherAttack': ['./spellmasons-mods/explosive_archer/RPG3_FireMagic_Impact01.mp3']
  },
};
export default mod;
