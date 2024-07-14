import type * as commonTypes from './types/types/commonTypes';

import UndeadBlade from './undead_blade/undead_blade';
import Wodes_Grimoire from './Wodes_Grimoire/Index';
import Renes_Gimmicks from './Renes_gimmicks/Index';
import DaiNekoIchis_TomeOfSpells from './DaiNekoIchis_TomeOfSpells/Index';

const mods: commonTypes.Mod[] = [
    UndeadBlade,
    Wodes_Grimoire,
    Renes_Gimmicks,
    DaiNekoIchis_TomeOfSpells
];
globalThis.mods = globalThis.mods !== undefined ? [...globalThis.mods, ...mods] : mods;
console.log('Mods: Add mods', globalThis.mods);