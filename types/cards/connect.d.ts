import { Spell } from './index';
import { Vec2 } from '../jmath/Vec';
import { HasSpace } from '../entity/Type';
declare const spell: Spell;
export declare function getTouchingTargetableEntitiesRecursive(x: number, y: number, potentialTargets: HasSpace[], radius: number, prediction: boolean, chainState: {
    limitTargetsLeft: number;
}, recurseLevel: number, filterFn: (x: any) => boolean, ignore?: HasSpace[]): Promise<{
    chainSource: Vec2;
    entity: HasSpace;
}[]>;
export default spell;
