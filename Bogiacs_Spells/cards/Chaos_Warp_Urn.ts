import { Faction, UnitType } from "../../types/types/commonTypes";
import { Spell, addUnitTarget } from '../../types/cards/./index';
import { getUniqueSeedString } from '../../types/jmath/rand';
import * as Unit from '../../types/entity/Unit';
import { allUnits } from '../../types/entity/units';
import seedrandom from '../seedrandom';
import { urn_explosive_id } from '../../types/entity/units/urn_explosive';
import { urn_poison_id } from '../../types/entity/units/urn_poison';
import { urn_ice_id } from '../../types/entity/units/urn_ice';
import { chaosWarpCardId } from './Chaos_Warp';

const {
    FloatingText,
    cardUtils,
    commonTypes,
    cards,
    VisualEffects,
} = globalThis.SpellmasonsAPI;

const { refundLastSpell } = cards;
const { CardCategory, probabilityMap, CardRarity } = commonTypes;

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

            const seed = seedrandom(`${getUniqueSeedString(underworld)} - ${Math.random()}`);
            
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

            return state;
        },
    },
};
export default spell;