/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { BoxDelta, Point2D } from "../../../types/geometry";
import { ResolvedValues } from "../../types";
import { LayoutState } from "../../utils/state";
export declare type BuildProjectionTransform = (box: BoxDelta, treeScale: Point2D, transform?: ResolvedValues) => string;
export declare type BuildProjectionTransformOrigin = (layout: LayoutState) => string;
/**
 * Build a transform style that takes a calculated delta between the element's current
 * space on screen and projects it into the desired space.
 */
export declare function buildLayoutProjectionTransform({ x, y }: BoxDelta, treeScale: Point2D, latestTransform?: ResolvedValues): string;
/**
 * Take the calculated delta origin and apply it as a transform string.
 */
export declare function buildLayoutProjectionTransformOrigin({ deltaFinal, }: LayoutState): string;
export declare const identityProjection: string;
