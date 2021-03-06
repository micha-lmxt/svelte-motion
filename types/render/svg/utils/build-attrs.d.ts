/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { DOMVisualElementOptions } from "../../dom/types";
import { ResolvedValues } from "../../types";
import { MotionProps } from "../../../motion/types";
import { LayoutState, TargetProjection } from "../../utils/state";
import { SVGRenderState } from "../types";
import { BuildProjectionTransform, BuildProjectionTransformOrigin } from "../../html/utils/build-projection-transform";
/**
 * Build SVG visual attrbutes, like cx and style.transform
 */
export declare function buildSVGAttrs(state: SVGRenderState, { attrX, attrY, originX, originY, pathLength, pathSpacing, pathOffset, ...latest }: ResolvedValues, projection: TargetProjection | undefined, layoutState: LayoutState | undefined, options: DOMVisualElementOptions, transformTemplate?: MotionProps["transformTemplate"], buildProjectionTransform?: BuildProjectionTransform, buildProjectionTransformOrigin?: BuildProjectionTransformOrigin): void;
