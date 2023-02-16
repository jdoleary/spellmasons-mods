import type { Spell } from '../types/cards/index';
import { Mod } from '../types/types/commonTypes';

const {
    PixiUtils,
    rand,
    cardUtils,
    commonTypes,
} = globalThis.SpellmasonsAPI;
const { randFloat } = rand;
const { containerSpells } = PixiUtils;
const Unit = globalThis.SpellmasonsAPI.Unit;
const { oneOffImage, playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

const cardId = 'Undead Blade';
const damageDone = 40;
export interface UnitDamage {
    id: number;
    x: number;
    y: number;
    health: number;
    damageTaken: number;

}
const animationPath = 'spellUndeadBlade';
const delayBetweenAnimationsStart = 400;
const spell: Spell = {
    card: {
        id: cardId,
        category: CardCategory.Damage,
        supportQuantity: true,
        manaCost: 10,
        healthCost: 0,
        expenseScaling: 1,
        probability: probabilityMap[CardRarity.COMMON],
        thumbnail: 'spellmasons-mods/undead_blade/spellIconUndeadBlade.png',
        animationPath,
        sfx: 'hurt',
        description: ['spell_slash', damageDone.toString()],
        effect: async (state, card, quantity, underworld, prediction) => {
            let animationDelaySum = 0;
            // .filter: only target living units
            const targets = state.targetedUnits.filter(u => u.alive)
            animationDelaySum = 0;
            let delayBetweenAnimations = delayBetweenAnimationsStart;
            // Note: quantity loop should always be INSIDE of the targetedUnits loop
            // so that any quantity-based animations will play simultaneously on multiple targets
            // but sequentially within themselves (on a single target, e.g. multiple hurts over and over)
            for (let q = 0; q < quantity; q++) {
                if (!prediction && !globalThis.headless) {
                    setTimeout(() => {
                        playDefaultSpellSFX(card, prediction);
                        for (let unit of targets) {
                            const spellEffectImage = oneOffImage(unit, animationPath, containerSpells);
                            if (spellEffectImage) {
                                // Randomize rotation a bit so that subsequent slashes don't perfectly overlap
                                spellEffectImage.sprite.rotation = randFloat(-Math.PI / 6, Math.PI / 6);
                                if (q % 2 == 0) {
                                    // Flip every other slash animation so that it comes from the other side
                                    spellEffectImage.sprite.scale.x = -1;
                                }
                            }
                            setTimeout(() => {
                                Unit.takeDamage(unit, damageDone, state.casterUnit, underworld, prediction, state);
                            }, 100)
                        }
                    }, animationDelaySum)
                    animationDelaySum += delayBetweenAnimations;
                    // Don't let it go below 20 milliseconds
                    delayBetweenAnimations = Math.max(20, delayBetweenAnimations);
                    // Juice: Speed up subsequent hits
                    delayBetweenAnimations *= 0.80
                } else {
                    for (let unit of targets) {
                        Unit.takeDamage(unit, damageDone, state.casterUnit, underworld, prediction, state);
                    }
                }
            }
            if (!prediction && !globalThis.headless) {
                await new Promise((resolve) => {
                    setTimeout(resolve, animationDelaySum);
                })
            }
            return state;
        },
    },
};

const mod: Mod = {
    modName: 'Undead Blade',
    author: 'Jordan O\'Leary',
    description: 'Adds a new spell',
    screenshot: '',
    spells: [
        spell
    ],
    spritesheet: 'spellmasons-mods/undead_blade/undead_blade.json'
};
export default mod;
