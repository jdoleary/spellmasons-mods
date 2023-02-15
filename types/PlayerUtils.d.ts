import * as Player from './entity/Player';
import { Vec2 } from './jmath/Vec';
import Underworld from './Underworld';
export declare function isOutOfRange(caster: Player.IPlayer, target: Vec2, underworld: Underworld, cardIds?: string[]): boolean;
export declare function getEndOfRange(caster: Player.IPlayer, target: Vec2): Vec2;
export declare function setPlayerNameUI(player: Player.IPlayer): void;
