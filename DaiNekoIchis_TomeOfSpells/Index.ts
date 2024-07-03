import { Mod } from '../types/types/commonTypes';
import Gravity from './cards/Gravity';
import LimitGlove from './cards/LimitGlove';
import WhiteWind from './cards/WhiteWind';
import { TargetHpPrime, TargetHp3, TargetHp4, TargetHp5 } from './cards/TargetHpCards';
const mod: Mod = {
    modName: 'DaiNekoIchi\'s Tome of Spells',
    author: 'DaiNekoIchi, PADS',
    description: 'Adds several spells (probably heavily inspired from Final Fantasy)',
    screenshot: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/TomeOfSpellsIcon.png',
    spells: [
        Gravity,
        LimitGlove,
        WhiteWind,
        TargetHpPrime,
        TargetHp3,
        TargetHp4,
        TargetHp5,
    ],
    spritesheet: 'spellmasons-mods/DaiNekoIchis_TomeOfSpells/graphics/spritesheet.json'
};
export default mod;