/// <reference path="../../globalTypes.d.ts" />
import { Vec2 } from '../../types/jmath/Vec';
const {
    Particles,
    particleEmitter,
} = globalThis.SpellmasonsAPI;

export function makeFlameStrikeWithParticles(position: Vec2, prediction: boolean, resolver?: () => void) {
    if (prediction || globalThis.headless) {
        // Don't show if just a prediction
        if (resolver) {
            resolver();
        }
        return;
    }
    const texture = Particles.createParticleTexture();
    if (!texture) {
        Particles.logNoTextureWarning('makeFlameStrikeAttack');
        return;
    }
    const config =
        particleEmitter.upgradeConfig({
            autoUpdate: true,
            "alpha": {
                "start": 0.425,
                "end": 0.25
            },
            "scale": {
                "start": 1.5,
                "end": 3,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#ebc323",
                "end": "#e63e1c"
            },
            "speed": {
                "start": 400,
                "end": 0,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": -500
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 80,
                "max": 100
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 0.5,
                "max": 1.3
            },
            "blendMode": "normal",
            "frequency": 0.004,
            "emitterLifetime": 1.2,
            "maxParticles": 230,
            "pos": {
                "x": 0,
                "y": -300
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": -5,
                "y": 180,
                "w": 10,
                "h": 0
            }
        }, [texture]);
    Particles.simpleEmitter(position, config, resolver);
}