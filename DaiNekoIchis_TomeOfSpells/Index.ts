import { Mod } from '../types/types/commonTypes';

import Gravity from './cards/Gravity';
import LimitGlove from './cards/LimitGlove';
import WhiteWind from './cards/WhiteWind';
import TargetHp3 from './cards/TargetHp3';
import TargetHp4 from './cards/TargetHp4';
import TargetHp5 from './cards/TargetHp5';
import TargetHpPrime from './cards/TargetHpPrime';
const mod: Mod = {
    modName: 'DaiNekoIchi\'s Tome of Spells',
    author: 'DaiNekoIchi, PADS',
    description: 'Adds several spells (probably heavily inspired from Final Fantasy)',
    screenshot: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/TomeOfSpellsIcon.png',
    spells: [
        Gravity,
        LimitGlove,
        WhiteWind,
        TargetHp3,
        TargetHp4,
        TargetHp5,
        TargetHpPrime
    ],
    spritesheet: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/spritesheet.json'
};
export default mod;