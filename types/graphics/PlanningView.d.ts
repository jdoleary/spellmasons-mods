import type * as PIXI from 'pixi.js';
import { Vec2 } from '../jmath/Vec';
import Underworld from '../Underworld';
import * as Unit from '../entity/Unit';
export declare function initPlanningView(): void;
export declare function updatePlanningView(underworld: Underworld): void;
export declare function drawWalkRope(target: Vec2, underworld: Underworld): void;
export declare function clearTints(underworld: Underworld): void;
export declare function drawHealthBarAboveHead(unitIndex: number, underworld: Underworld, zoom: number): void;
export declare function getFillRect(unit: Unit.IUnit, min: number, max: number, value1: number, value2: number, zoom: number): {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare function drawUnitMarker(imagePath: string, pos: Vec2, unitYScale?: number, extraMarkerScale?: number): void;
export declare function runPredictions(underworld: Underworld): Promise<void>;
export declare function clearSpellEffectProjection(underworld: Underworld, forceClear?: boolean): void;
export declare function drawPredictionLine(start: Vec2, end: Vec2): void;
export declare function drawUIPoly(graphics: PIXI.Graphics, points: Vec2[], color: number, text?: string): void;
export declare function drawUICone(graphics: PIXI.Graphics, target: Vec2, radius: number, startArc: number, endArc: number, color: number): void;
export declare function drawUICircle(graphics: PIXI.Graphics, target: Vec2, radius: number, color: number, text?: string): void;
export declare function drawUICircleFill(graphics: PIXI.Graphics, target: Vec2, radius: number, color: number, text?: string): void;
export declare function drawUIPolyPrediction(points: Vec2[], color: number, text?: string): void;
export declare function drawUIConePrediction(target: Vec2, radius: number, startArc: number, endArc: number, color: number, text?: string): void;
export declare function drawUICirclePrediction(target: Vec2, radius: number, color: number, text?: string): void;
export declare function drawUICircleFillPrediction(target: Vec2, radius: number, color: number, text?: string): void;
export declare function setPredictionGraphicsLineStyle(color: number): void;
export declare function isOutOfBounds(target: Vec2, underworld: Underworld): boolean;
export declare function updateTooltipContent(underworld: Underworld): void;
export declare function checkIfNeedToClearTooltip(): void;
export declare function clearTooltipSelection(): boolean;
export declare function updateTooltipSelectionWhileSpawning(mousePos: Vec2, underworld: Underworld): void;
export declare function updateTooltipSelection(mousePos: Vec2, underworld: Underworld): void;
export declare function drawCircleUnderTarget(mousePos: Vec2, underworld: Underworld, opacity: number, graphics: PIXI.Graphics | undefined, fill?: number): void;
export declare function addWarningAtMouse(warning: string): void;
export declare function removeWarningAtMouse(warning: string): void;
export declare function clearWarnings(): void;
