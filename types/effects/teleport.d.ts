import Underworld from "../Underworld";
import { HasSpace } from "../entity/Type";
import { Vec2 } from "../jmath/Vec";
export declare function teleport(object: HasSpace, newLocation: Vec2, underworld: Underworld, prediction: boolean, usePredictionLines?: boolean): void;
