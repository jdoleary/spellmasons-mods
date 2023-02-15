
import type ISpellmasonsAPI from './types/api';
import { Mod } from './types/types/commonTypes';

declare global {
    var SpellmasonsAPI: typeof ISpellmasonsAPI;
    var mods: Mod[];
}