/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { MotionProps } from "../../../motion/types";
import { HTMLRenderState } from "../types";
import { ResolvedValues } from "../../types";
import { LayoutState, TargetProjection } from "../../utils/state";
import { DOMVisualElementOptions } from "../../dom/types";
import { BuildProjectionTransform, BuildProjectionTransformOrigin } from "./build-projection-transform";
export declare function buildHTMLStyles(state: HTMLRenderState, latestValues: ResolvedValues, projection: TargetProjection | undefined, layoutState: LayoutState | undefined, options: DOMVisualElementOptions, transformTemplate?: MotionProps["transformTemplate"], buildProjectionTransform?: BuildProjectionTransform, buildProjectionTransformOrigin?: BuildProjectionTransformOrigin): void;
