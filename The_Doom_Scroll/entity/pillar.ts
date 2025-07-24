const {commonTypes} = globalThis.SpellmasonsAPI
const { UnitSubType } = commonTypes;
import type { UnitSource } from "../../types/entity/units";
import type Underworld from "../../types/Underworld";
import type { bloodDecoy } from "../../types/graphics/ui/colors";
import type { IUnit } from '../../types/entity/Unit';

const unit: UnitSource = {
  id: 'pillar',
  info: {
    description: 'An earthen pillar raised by a geomancer that blocks the path of enemies. Will not block projectiles.',
    image: 'pillar',
    subtype: UnitSubType.DOODAD,
  },
  animations: {
    idle: 'pillar',
    hit: 'pillar',
    attack: 'pillar',
    die: 'pillarDeath',
    walk: 'pillar',
  },
  sfx: {
    damage: 'unitDamage',
    death: 'decoyDeath',
  },
  unitProps: {
    damage: 0,
    attackRange: 0,
    staminaMax: 0,
    healthMax: 150,
    manaMax: 0,
    // This is critical to a decoy, it prevents it from being pushed due to unit crowding
    immovable: true,
    radius: 48,
    bloodColor: 8082207,
  },
  action: async (_self: IUnit, _attackTargets: IUnit[], _underworld: Underworld, _canAttackTarget: boolean) => { },
  getUnitAttackTargets: (unit: IUnit, underworld: Underworld) => { return []; }
};

export default unit;
