
import type ISpellmasonsAPI from './types/api';
import { Mod } from './types/types/commonTypes';

declare global {
    var SpellmasonsAPI: typeof ISpellmasonsAPI;
    var mods: Mod[];
    // true if this instance is the headless server with no visuals or audio, just the game logic
    var headless: boolean;
    // Graphics for drawing the spell effects during the dry run phase
    var predictionGraphics: PIXI.Graphics | undefined;
}