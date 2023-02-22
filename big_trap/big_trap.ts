/// <reference path="../globalTypes.d.ts" />
import { IPickupSource } from '../types/entity/Pickup';
import { Mod } from '../types/types/commonTypes';

const {
    config,
    PixiUtils,
    Unit,
} = globalThis.SpellmasonsAPI;
const { addPixiSpriteAnimated, containerUnits } = PixiUtils;

const spike_damage = 80;
const huge_trap: IPickupSource = {
    imagePath: 'pickups/trap',
    animationSpeed: -config.DEFAULT_ANIMATION_SPEED,
    playerOnly: false,
    singleUse: true,
    name: 'Huge Trap',
    probability: 70,
    scale: 1.5,
    description: [`A huge trap that does ${spike_damage} damage.`],
    willTrigger: ({ unit, player, pickup, underworld }) => {
        return !!unit;
    },
    effect: ({ unit, player, pickup, prediction, underworld }) => {
        if (unit) {
            // Play trap spring animation
            if (!prediction && !globalThis.headless) {
                const animationSprite = addPixiSpriteAnimated('pickups/trapAttack', containerUnits, {
                    loop: false,
                    animationSpeed: 0.2,
                    onComplete: () => {
                        if (animationSprite?.parent) {
                            animationSprite.parent.removeChild(animationSprite);
                        }
                    }
                });
                if (animationSprite) {

                    animationSprite.anchor.set(0.5);
                    animationSprite.x = pickup.x;
                    animationSprite.y = pickup.y;
                }
                const animationSprite2 = addPixiSpriteAnimated('pickups/trapAttackMagic', containerUnits, {
                    loop: false,
                    animationSpeed: 0.2,
                    onComplete: () => {
                        if (animationSprite2?.parent) {
                            animationSprite2.parent.removeChild(animationSprite2);
                        }
                    }
                });
                if (animationSprite2) {
                    animationSprite2.anchor.set(0.5);
                    animationSprite2.x = pickup.x;
                    animationSprite2.y = pickup.y;
                }

            }
            Unit.takeDamage(unit, spike_damage, unit, underworld, prediction)
        }
    }
};

const mod: Mod = {
    modName: 'Big Trap',
    author: 'Jordan O\'Leary',
    description: "A large trap that does more damage than the normal sized trap.",
    screenshot: 'spellmasons-mods/big_trap/bigTrapScreenshot.png',
    pickups: [
        huge_trap
    ],
};
export default mod;