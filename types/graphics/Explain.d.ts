export declare function explain(key: string, forceShow?: boolean): void;
export declare const EXPLAIN_WALK = "How to Move";
export declare const EXPLAIN_OVERFILL = "Mana Overfill";
export declare const EXPLAIN_CAST = "Forging Spells";
export declare const EXPLAIN_STACK = "Stacking Spells";
export declare const EXPLAIN_WALK_ROPE = "Stamina";
export declare const EXPLAIN_END_TURN = "End Turn";
export declare const EXPLAIN_MANA_COST = "Mana Cost";
export declare const EXPLAIN_ATTENTION_MARKER_MELEE = "Melee Agro";
export declare const EXPLAIN_ATTENTION_MARKER_RANGED = "Ranged Agro";
export declare const EXPLAIN_CAMERA = "Camera Movement";
export declare const EXPLAIN_INVENTORY = "Inventory";
export declare const EXPLAIN_LIQUID_DAMAGE = "Liquid Damage";
export declare const EXPLAIN_BLESSINGS = "Blessings";
export declare const EXPLAIN_REMOVE_SPELLS = "Remove Spells";
export declare const EXPLAIN_FORGE_ORDER = "Spell Forge Order";
export declare const EXPLAIN_DEATH = "Surviving Death";
export declare const EXPLAIN_MINI_BOSSES = "Mini Bosses";
export declare const EXPLAIN_PING = "Pinging";
export declare const autoExplains: string[];
export declare function autoExplain(): void;
export declare function setTutorialVisiblity(visible: boolean): void;
interface TutorialChecklistItem {
    visible: boolean;
    complete: boolean;
    text: string;
    nextVisibleTasks: (keyof TutorialChecklist)[];
    showExplainPopup: string[];
}
export interface TutorialChecklist {
    spawn: TutorialChecklistItem;
    moved: TutorialChecklistItem;
    portal: TutorialChecklistItem;
    cast: TutorialChecklistItem;
    castMultipleInOneTurn: TutorialChecklistItem;
    camera: TutorialChecklistItem;
    recenterCamera: TutorialChecklistItem;
}
export declare function updateTutorialChecklist(): void;
export declare function tutorialCompleteTask(key: keyof TutorialChecklist, condition?: () => boolean): void;
export declare function tutorialShowTask(key: keyof TutorialChecklist): void;
export declare function isTutorialComplete(): boolean;
export declare function isFirstTutorialStepComplete(): boolean;
export {};
