import { PixiSpriteOptions } from '../graphics/PixiUtils';
import type { Vec2 } from '../jmath/Vec';
export declare const SPEED_PER_MILLI = 0.9;
export declare function createVisualFlyingProjectile(coords: Vec2, target: Vec2, imagePath: string): Promise<void>;
export declare function createVisualLobbingProjectile(coords: Vec2, target: Vec2, imagePath?: string, options?: PixiSpriteOptions): Promise<void>;
