import type { Spell } from '../../types/cards';
const urn_explosive_id = "Explosive Urn";
const urn_poison_id = "Toxic Urn";
const urn_ice_id = "Ice Urn";

const {
    cardUtils,
    commonTypes,
    cards,
    VisualEffects,
    rand,
    units,
    Pickup,
    Unit,
    JAudio
} = globalThis.SpellmasonsAPI;

const { chooseObjectWithProbability, getUniqueSeedString } = rand;
const { allUnits } = units;
const { refundLastSpell, addUnitTarget } = cards;
const { playDefaultSpellSFX } = cardUtils;
const { CardCategory, probabilityMap, CardRarity, Faction, UnitType } = commonTypes;

export const chaosWarpCardId = 'Chaos Warp';
const spell: Spell = {
    card: {
        id: chaosWarpCardId,
        category: CardCategory.Soul,
        supportQuantity: false,
        manaCost: 40,
        healthCost: 0,
        expenseScaling: 1.5,
        probability: probabilityMap[CardRarity.UNCOMMON],
        thumbnail: 'spellmasons-mods/Bogiacs_Spells/graphics/icons/ChaosWarp.png',
        sfx: 'summonDecoy',
        description: [`Summons a random item. Potion, Trap, Urn, Portal`],
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
            const seed = rand.seedrandom(`${getUniqueSeedString(underworld, state.casterPlayer)}${state.castLocation.x}${state.castLocation.y}`);
            const randomEffect = rand.randInt(0, 10, seed);

            if (randomEffect <= 5) {//Summon Potion

                const choicePotion = chooseObjectWithProbability(Pickup.pickups.map((p, indexPotion) => {
                    return {
                        indexPotion, probability: p.name.includes('Potion') ? p.probability : 0
                    }
                }), seed);
                if (choicePotion) {
                    const { indexPotion } = choicePotion;
                    underworld.spawnPickup(indexPotion, summonLocation, prediction);

                    if (!prediction) {
                        JAudio.playSFXKey('spawnPotion');
                        VisualEffects.skyBeam(summonLocation)
                    }
                } else {
                    refundLastSpell(state, prediction)
                }
            }
            else if (randomEffect <= 7) {//Summon Trap
                playDefaultSpellSFX(card, prediction);
                const index = 0;
                underworld.spawnPickup(index, summonLocation, prediction);
                if (!prediction) {
                    VisualEffects.skyBeam(summonLocation)
                }

                return state;
            }
            else if (randomEffect <= 9) {//Summon Urn

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
            }
            else if (randomEffect > 9) {//Summon Portal
                const portalPickupSource = Pickup.pickups.find(p => p.name == Pickup.PORTAL_PURPLE_NAME);
                if (portalPickupSource) {
                    if (!prediction) {
                        Pickup.create({ pos: summonLocation, pickupSource: portalPickupSource, logSource: 'Chaos Warp Portal' }, underworld, prediction);
                        VisualEffects.skyBeam(summonLocation)
                    }
                } else {
                    refundLastSpell(state, prediction)
                }

            }

            return state;
        },
    },
};
export default spell;