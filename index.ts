import type * as commonTypes from './types/types/commonTypes';

import ExplosiveArcher from './explosive_archer/explosive_archer';
import UndeadBlade from './undead_blade/undead_blade';
import BigTrap from './big_trap/big_trap';

const mods: commonTypes.Mod[] = [
    ExplosiveArcher,
    UndeadBlade,
    BigTrap
];
console.log('Mods: Add mods', mods);
globalThis.mods = mods;