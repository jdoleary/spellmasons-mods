import type * as commonTypes from './types/types/commonTypes';

import ExplosiveArcher from './explosive_archer/explosive_archer';
import UndeadBlade from './undead_blade/undead_blade';

const mods: commonTypes.Mod[] = [
    ExplosiveArcher,
    UndeadBlade
];
console.log('Mods: Add mods', mods);
globalThis.mods = mods;