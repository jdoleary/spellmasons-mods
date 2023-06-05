Thanks to my friend, Pig, for making the icons!

Installation:
    Enable in the Spellmason's mod page!

    Otherwise:
        Place Wodes_grimoire in "Spellmasons/resources/app/src/build/spellmasons-mods"
        Open the spellmasons-mods index.ts
        Put in "import Wodes_Grimoire from './Wodes_Grimoire/Index';" with the other imports
        Put "Wodes_Grimoire," in the list of const mods: commonTypes.Mod[]
        It should look similar to this:
            const mods: commonTypes.Mod[] = [
                ExplosiveArcher,
                UndeadBlade,
                Wodes_Grimoire,
            ];
        Open a terminal application in the spellmasons-mods directory
        Type in "npm install"
        Type in "npm run build"
        Then enable in the game's mod menu
        All set!
If you want to add or remove spells that Wode's Grimoire has, you can change it in Wodes_Grimoire/index.ts.

Uninstall:
    If you installed this mod manually, you can uninstall by validating you steam files or by removing the lines you added in spellmasons-mods/index.ts, removing Wodes_Grimoire folder, and running "npm run build" again

Changelog:
v1.0.1:
    Balance: Increased costs of ensnare and Pacify
    Fix: Harvest no longer targets other player corpses which causes a crash in multiplayer
    Fix: Vengance will now recalculate damage mid-spellcast

v1 Initial release:
    Added new spells: Flamestrike, Decay, Ensnare, Grace, Harvest, Pacify, Regen, Vengance.