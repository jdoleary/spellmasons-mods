
import { Mod } from '../types/types/commonTypes';

//Imports for spells here
import Vampire_bite from './cards/Vampire_bite';
import Summon_trap from './cards/Summon_trap';
import Sadism from './cards/Sadism'
import Burning_Rage from './cards/Burning_rage'

const mod: Mod = {
    modName: 'Rene\s gimmicks',
    author: 'Renesans123/Edeusz',
    description: 'Adds some new spells to the game',
    screenshot: 'spellmasons-mods/Renes_gimmicks/graphics/icons/Renes_Gimmicks_icon.png',
    spells: [
        //Add or Remove spells here.
        Vampire_bite,
        Summon_trap,
        Sadism,
        Burning_Rage,
    ],
};
export default mod;