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
    Unit
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

            const randomEffect = Math.floor(Math.random() * 10) + 1;
            const seed = rand.seedrandom(`${getUniqueSeedString(underworld)} - ${Math.random()}`);

            if (randomEffect <= 5) {//Summon Potion

                const choicePotion = chooseObjectWithProbability(Pickup.pickups.map((p, indexPotion) => {
                    return {
                        indexPotion, probability: p.name.includes('Potion') ? p.probability : 0
                    }
                }), seed);
                if (choicePotion) {
                    const { indexPotion } = choicePotion;
                    if (summonLocation) {
                        underworld.spawnPickup(indexPotion, summonLocation, prediction);

                        if (!prediction) {
                            //setTimeout(() => {
                            //    playSFXKey('spawnPotion');
                            //}, 1000);
                            VisualEffects.skyBeam(summonLocation)
                        }
                    } else {
                        refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')
                    }
                } else {
                    refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')

                }
                //}
            }
            else if (randomEffect <= 7) {//Summon Trap
                if (underworld.isCoordOnWallTile(summonLocation)) {
                    if (prediction) {

                    } else {
                        refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')
                    }

                    return state;
                }
                playDefaultSpellSFX(card, prediction);
                const index = 0;
                if (!prediction) {
                    underworld.spawnPickup(index, summonLocation, prediction);
                    VisualEffects.skyBeam(summonLocation)
                } else {

                }

                return state;
            }
            else if (randomEffect <= 9) {//Summon Urn

                const choiceUrns = Math.floor(Math.random() * 3) + 1;
                let urnID: string;

                urnID = urn_explosive_id;

                if (choiceUrns == 1) {
                    urnID = urn_ice_id;
                }
                if (choiceUrns == 2) {
                    urnID = urn_poison_id;
                }

                let sourceUnit = allUnits[urnID];
                if (sourceUnit) {


                    if (!prediction) {
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
                        VisualEffects.skyBeam(summonLocation)
                    }

                } else {
                    refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')
                }

            }
            else if (randomEffect > 9) {//Summon Portal
                const portalPickupSource = Pickup.pickups.find(p => p.name == Pickup.PORTAL_PURPLE_NAME);
                if (portalPickupSource) {
                    if (!prediction) {
                        Pickup.create({ pos: summonLocation, pickupSource: portalPickupSource, logSource: 'Bounty Portal' }, underworld, prediction);
                        VisualEffects.skyBeam(summonLocation)
                    }

                } else {
                    refundLastSpell(state, prediction, 'Invalid summon location, mana refunded.')
                }

            }

            return state;
        },
    },
};
export default spell;