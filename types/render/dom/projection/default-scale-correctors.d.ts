/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { Axis } from "../../../types/geometry";
import { LayoutState, TargetProjection } from "../../utils/state";
export declare function pixelsToPercent(pixels: number, axis: Axis): number;
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */
export declare function correctBorderRadius(latest: string | number, _layoutState: LayoutState, { target }: TargetProjection): string;
export declare function correctBoxShadow(latest: string, { delta, treeScale }: LayoutState): string;
export declare const defaultScaleCorrectors: {
    borderRadius: {
        applyTo: string[];
        process: typeof correctBorderRadius;
    };
    borderTopLeftRadius: {
        process: typeof correctBorderRadius;
    };
    borderTopRightRadius: {
        process: typeof correctBorderRadius;
    };
    borderBottomLeftRadius: {
        process: typeof correctBorderRadius;
    };
    borderBottomRightRadius: {
        process: typeof correctBorderRadius;
    };
    boxShadow: {
        process: typeof correctBoxShadow;
    };
};
