import type { Mod } from '../types/types/commonTypes';

//Imports for spells here
import ChaosWarp from './cards/Chaos_Warp';
import ChaosWarpPotion from './cards/Chaos_Warp_Potion';
import ChaosWarpUrn from './cards/Chaos_Warp_Urn';
import Distance_Increase from './cards/Distance_Increase';
//import Impact from './cards/Impact';
import Reflect from './cards/Reflect';
import Reinforce from './cards/Reinforce';
import Revitalise from './cards/Revitalise';
import Siphon from './cards/Siphon';
import TargetAlly from './cards/Target_Ally';
import TargetPlayer from './cards/Target_Player';
import TripleSlash from './cards/Triple_Slash';

const mod: Mod = {
    modName: 'Bogiac\'s Spells',
    author: 'Bogiac',
    description: 'Adds some new spells to the game',
    screenshot: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/Bogiacs_Spells_icon.png',
    spritesheet: 'spellmasons-mods/Bogiacs_Spells/graphics/spritesheet.json',
    spells: [
        //Add or Remove spells here.
        ChaosWarp,
        ChaosWarpPotion,
        ChaosWarpUrn,
        Distance_Increase,
        //Impact,
        Reflect,
        Reinforce,
        Revitalise,
        Siphon,
        TargetAlly,
        TargetPlayer,
        TripleSlash,

    ],
};
export default mod;