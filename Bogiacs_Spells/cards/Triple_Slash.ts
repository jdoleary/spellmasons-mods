import { slashCardId } from '../../types/cards/slash';
import { ICard } from '../../types/cards/./index';
import Underworld from "../../types/Underworld";
import { CardCategory } from '../../types/types/commonTypes';
import { CardRarity, probabilityMap } from '../../types/types/commonTypes';
import { containerSpells } from '../../types/graphics/PixiUtils';
import { playDefaultSpellSFX } from "../../types/cards/cardUtils";
import { EffectState, refundLastSpell, Spell,  } from '../../types/cards/./index';
import * as Unit from '../../types/entity/Unit';
import { oneOffImage } from '../../types/cards/./cardUtils';
import { randFloat } from '../../types/jmath/rand';


export const tripleSlashCardId = 'Triple Slash';
const damageDone = 20;
const delayBetweenAnimationsStart = 250;
const animationPath = 'spellHurtCuts';
const spell: Spell = {
    card: {
        id: tripleSlashCardId,
        requires: [slashCardId],
        category: CardCategory.Damage,
        supportQuantity: true,
        manaCost: 20,
        healthCost: 0,
        expenseScaling: 1,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/TripleSlash.png',
        animationPath,
        sfx: 'hurt',
        description: [`Casts the Slash Spell three times.`],
        effect: async (state, card, quantity, underworld, prediction) => {
            
            return await tripleSlashEffect(state, card, quantity, underworld, prediction, damageDone, 1);

            if (state.targetedUnits.filter(u => u.alive).length == 0) {
                refundLastSpell(state, prediction, 'No valid targets. Cost refunded.');
            }
        },
    },
};

export async function tripleSlashEffect(state: EffectState, card: ICard, quantity: number, underworld: Underworld, prediction: boolean, damage: number, scale: number) {
    // .filter: only target living units
    const targets = state.targetedUnits.filter(u => u.alive)
    let delayBetweenAnimations = delayBetweenAnimationsStart;
    // Note: quantity loop should always be INSIDE of the targetedUnits loop
    // so that any quantity-based animations will play simultaneously on multiple targets
    // but sequentially within themselves (on a single target, e.g. multiple hurts over and over) for (let tripleSlashCounter = 1; tripleSlashCounter < 3; tripleSlashCounter++) {

    for (let tripleSlashCounter = 0; tripleSlashCounter < 3; tripleSlashCounter++) {
        for (let q = 0; q < quantity; q++) {
            if (!prediction && !globalThis.headless) {
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
                        // Scale for MEGA SLASH
                        spellEffectImage.sprite.scale.x *= scale;
                        spellEffectImage.sprite.scale.y *= scale;
                    }

                    Unit.takeDamage({
                        unit: unit,
                        amount: damage,
                        sourceUnit: state.casterUnit,
                        fromVec2: state.casterUnit,
                    }, underworld, prediction);
                }
                // Wait some delay between attacks
                await new Promise(resolve => setTimeout(resolve, delayBetweenAnimations));
                // Juice: Speed up subsequent hits
                delayBetweenAnimations *= 0.80
                // Don't let it go below 20 milliseconds
                delayBetweenAnimations = Math.max(20, delayBetweenAnimations);
            } else {
                for (let unit of targets) {
                    Unit.takeDamage({
                        unit: unit,
                        amount: damage,
                        sourceUnit: state.casterUnit,
                        fromVec2: state.casterUnit,
                    }, underworld, prediction);
                }
            }
        }
    }
    return state;
}
export default spell;
