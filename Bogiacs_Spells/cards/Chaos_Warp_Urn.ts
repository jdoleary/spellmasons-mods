import { Spell } from '../../types/cards/./index';
const urn_explosive_id = "Explosive Urn";
const urn_poison_id = "Toxic Urn";
const urn_ice_id = "Ice Urn";
import { chaosWarpCardId } from './Chaos_Warp';

const {
    commonTypes,
    cards,
    VisualEffects,
    rand,
    units,
    Unit
} = globalThis.SpellmasonsAPI;

const { allUnits } = units;
const { getUniqueSeedString } = rand;
const { refundLastSpell, addUnitTarget } = cards;
const { CardCategory, probabilityMap, CardRarity, Faction, UnitType } = commonTypes;

export const chaosWarpUrnCardId = 'Chaos Warp - Urn';
const spell: Spell = {
    card: {
        id: chaosWarpUrnCardId,
        category: CardCategory.Soul,
        supportQuantity: false,
        manaCost: 10,
        healthCost: 0,
        expenseScaling: 1.5,
        requires: [chaosWarpCardId],
        probability: probabilityMap[CardRarity.RARE],
        thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/ChaosWarpUrn.png',
        sfx: 'summonDecoy',
        description: [`Summons a random Urn.`],
        allowNonUnitTarget: true,
        effect: async (state, card, _quantity, underworld, prediction) => {

            const summonLocation = {
                x: state.castLocation.x,
                y: state.castLocation.y
            }
            if (!underworld.isPointValidSpawn(summonLocation, prediction)) {
                refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')
                return state;
            }

            // Unique to player and cast location so it doesn't spawn the same choice over and over
            const seedString = `${getUniqueSeedString(underworld, state.casterPlayer)}${state.castLocation.x}${state.castLocation.y}`;
            const seed = rand.seedrandom(seedString);
            const urnID = rand.chooseOneOfSeeded([urn_explosive_id, urn_ice_id, urn_poison_id], seed);
            if (urnID !== undefined) {
                let sourceUnit = allUnits[urnID];
                if (sourceUnit) {
                    const unit = Unit.create(
                        urnID,
                        summonLocation.x,
                        summonLocation.y,
                        Faction.ALLY,
                        sourceUnit.info.image,
                        UnitType.AI,
                        sourceUnit.info.subtype,
                        sourceUnit.unitProps,
                        underworld,
                        prediction
                    );
                    unit.healthMax *= 1;
                    unit.health *= 1;
                    unit.damage *= 1;
                    addUnitTarget(unit, state, prediction);
                    if (!prediction) {
                        VisualEffects.skyBeam(summonLocation)
                    }
                } else {
                    refundLastSpell(state, prediction)
                }
            } else {
                refundLastSpell(state, prediction)
            }

            return state;
        },
    },
};
export default spell;