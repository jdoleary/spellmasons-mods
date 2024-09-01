import Underworld from "../Underworld";
import { HasSpace } from "../entity/Type";
import { Vec2 } from "../jmath/Vec";
import * as Unit from '../entity/Unit';
export declare function teleport(object: HasSpace, newLocation: Vec2, underworld: Underworld, prediction: boolean, usePredictionLines?: boolean, sourceUnit?: Unit.IUnit): void;
