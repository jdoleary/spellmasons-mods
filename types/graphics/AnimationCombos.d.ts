interface AnimationCombo {
    keyFrame?: number;
    primaryAnimation: string;
    companionAnimations: string[];
    SFX?: string[];
}
declare const combos: {
    [spritePath: string]: AnimationCombo;
};
export default combos;
