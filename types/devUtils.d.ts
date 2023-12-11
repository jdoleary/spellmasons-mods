import type * as PIXI from 'pixi.js';
import { LineSegment } from './jmath/lineSegment';
import { Vec2 } from './jmath/Vec';
import { Overworld } from './Overworld';
export default function devUtils(graphics: PIXI.Graphics): {
    debugDrawLineSegments: (lines: LineSegment[]) => void;
    debugDrawVec2s: (points: Vec2[]) => void;
};
export declare function setupDevGlobalFunctions(overworld: Overworld): void;
export declare function measureInvokationsPerSecond(label: string): void;
