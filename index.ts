import type * as commonTypes from './types/types/commonTypes';

import ExplosiveArcher from './explosive_archer/explosive_archer';

const mods: commonTypes.Mod[] = [
    ExplosiveArcher
];
globalThis.mods = mods;