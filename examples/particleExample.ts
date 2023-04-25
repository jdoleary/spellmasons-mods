/// <reference path="../globalTypes.d.ts" />

// Note: Types should be imported directly from the type file,
// instead of from the SpellmasonsAPI
import type { Vec2 } from '../types/jmath/Vec';

const {
    particleEmitter,
    Particles,
    Vec
} = globalThis.SpellmasonsAPI;

export function makeExampleParticles(position: Vec2, prediction: boolean) {
    if (prediction || globalThis.headless) {
        // Don't show if just a prediction or running on the server (globalThis.headless)
        return;
    }
    const texture = Particles.createParticleTexture();
    if (!texture) {
        Particles.logNoTextureWarning('makeAncientParticles');
        return;
    }
    position = Vec.clone(position);
    const config =
        particleEmitter.upgradeConfig({
            autoUpdate: true,
            // Here is where custom particle styling goes
            // See https://youtu.be/zb5Eqxu5oIY for how to style particles
            // Pixijs Particle Editor: https://pixijs.io/pixi-particles-editor/
            // Note: particle `scale` and `speed` appear different between the pixi-particle-editor and in Spellmasons
            // so you'll have to adjust them after getting the "look" right in the editor
            "alpha": {
                "start": 1,
                "end": 0.28
            },
            "scale": {
                "start": 1.25,
                "end": 0.5,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": "#5a7879",
                "end": "#304748"
            },
            "speed": {
                "start": 60,
                "end": 30,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 265,
                "max": 275
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 50,
                "max": 50
            },
            "lifetime": {
                "min": 1,
                "max": 1
            },
            "blendMode": "normal",
            "frequency": 0.02,
            "emitterLifetime": 0.8,
            "maxParticles": 60,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 20
            }
        }, [texture]);
    Particles.simpleEmitter(position, config, () => { }, Particles.containerParticlesUnderUnits);
}