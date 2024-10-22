import type * as commonTypes from './types/types/commonTypes';

import UndeadBlade from './undead_blade/undead_blade';
import Wodes_Grimoire from './Wodes_Grimoire/Index';
import Renes_Gimmicks from './Renes_gimmicks/Index';
import DaiNekoIchis_TomeOfSpells from './DaiNekoIchis_TomeOfSpells/Index';
import BogiacsSpells from './Bogiacs_Spells/BogiacsSpells';

const mods: commonTypes.Mod[] = [
    UndeadBlade,
    Wodes_Grimoire,
    Renes_Gimmicks,
    DaiNekoIchis_TomeOfSpells,
    BogiacsSpells
];
globalThis.mods = globalThis.mods !== undefined ? [...globalThis.mods, ...mods] : mods;
console.log('Mods: Add mods', globalThis.mods);