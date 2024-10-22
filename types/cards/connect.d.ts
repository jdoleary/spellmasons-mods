import { Spell } from './index';
import { Vec2 } from '../jmath/Vec';
import { HasSpace } from '../entity/Type';
import Underworld from '../Underworld';
declare const spell: Spell;
export declare function getConnectingEntities(source: HasSpace, radius: number, chainsLeft: number, targets: HasSpace[] | undefined, potentialTargets: HasSpace[], filterFn: (x: any) => boolean, //selects which type of entities this can chain to
prediction: boolean, radiusFn?: (chainSource: HasSpace, chainsLeft: number) => number): {
    chainSource: HasSpace;
    entity: HasSpace;
}[];
export declare function getNextConnectingEntities(source: HasSpace, baseRadius: number, chainsLeft: number, potentialTargets: HasSpace[], prediction: boolean, radiusModifierFn?: (chainSource: HasSpace, chainsLeft: number) => number): {
    chainSource: HasSpace;
    entity: HasSpace;
}[];
export declare function animateConnections(links: AnimateConnectLinks[][], underworld: Underworld, prediction: boolean): Promise<any>;
interface AnimateConnectLinks {
    from: Vec2;
    targets: {
        to: Vec2;
        playedSound: boolean;
    }[];
}
export default spell;
