import type * as commonTypes from './types/types/commonTypes';

import ExplosiveArcher from './explosive_archer/explosive_archer';
import UndeadBlade from './undead_blade/undead_blade';
import Wodes_Grimoire from './Wodes_Grimoire/Index';

const mods: commonTypes.Mod[] = [
    ExplosiveArcher,
    UndeadBlade,
    Wodes_Grimoire,
];
console.log('Mods: Add mods', mods);
globalThis.mods = mods;