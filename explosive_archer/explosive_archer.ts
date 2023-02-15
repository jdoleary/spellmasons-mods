import type { UnitSource } from '../types/entity/units';
import type IUnit from '../types/entity/Unit';
import type Underworld from '../types/Underworld';
import { Mod } from '../types/types/commonTypes';
import { MultiColorReplaceFilter } from '@pixi/filter-multi-color-replace';
const {
  Projectile,
  rangedAction,
  commonTypes,
} = globalThis.SpellmasonsAPI;
const { createVisualFlyingProjectile } = Projectile;
const { getBestRangedLOSTarget, rangedLOSMovement } = rangedAction;
const { UnitSubType } = commonTypes;
const Unit = globalThis.SpellmasonsAPI.Unit;

export const ARCHER_ID = 'Explosive Archer';
const unit: UnitSource = {
  id: ARCHER_ID,
  info: {
    description: 'explosive archer description',
    image: 'units/archerIdle',
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
        return createVisualFlyingProjectile(
          unit,
          attackTarget,
          'projectile/arrow',
        ).then(() => {
          Unit.takeDamage(attackTarget, unit.damage, unit, underworld, false, undefined, { thinBloodLine: true });
        })

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
const mod: Mod = {
  modName: 'Explosive Archer',
  author: 'Jordan O\'Leary',
  description: 'Adds an archer to the game that shoots explosive arrows',
  screenshot: '',
  units: [
    unit
  ]
};
export default mod;
