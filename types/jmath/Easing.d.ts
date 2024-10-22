export declare function easeOutCubic(x: number): number;
interface TweenArgs {
    object: any;
    key: string;
    from: number;
    to: number;
    duration: number;
    easingFn?: (x: number) => number;
}
export declare function tween(tweenArgs: TweenArgs): Promise<unknown>;
export {};
