import type { UnitSource } from './index';
import { Vec2 } from '../../jmath/Vec';
declare const unit: UnitSource;
export declare function animateDrag(start: Vec2, end: Vec2): Promise<void>;
export default unit;
