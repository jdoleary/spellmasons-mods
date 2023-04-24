
import { Mod } from '../types/types/commonTypes';

//Imports for spells here
import Decay from './cards/Decay';
import Dominate from './cards/Dominate';
import Ensnare from './cards/Ensnare';
import FastForward from './cards/Fast_Forward';
import FlameStrike from './cards/FlameStrike';
import Grace from './cards/Grace';
import Harvest from './cards/Harvest';
import Regen from './cards/Regen'; //Regenerate
import Pacify from './cards/Pacify';
//import Stasis from './cards/Stasis';
import Vengeance from './cards/Vengeance';

const mod: Mod = {
    modName: 'Wode\'s Grimoire',
    author: 'Blood Spartan',
    description: 'Adds 10 new spells to your arsenal.', //TODO make word good
    screenshot: 'spellmasons-mods/Wodes_grimoire/graphics/icons/Wodes_grimoire_icon.png',
    spells: [
        //Add or Remove spells here.
        Decay,
        Dominate,
        Ensnare,
        FastForward, //Very buggy, absolutly no idea how I got this working, but it does /shrug
        FlameStrike,
        Grace,
        Harvest,
        Regen,
        Pacify,
        //Stasis, //Not working as intended, can still be pushed
        Vengeance,
        

    ],
};
export default mod;