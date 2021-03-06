/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { Target, TargetWithKeyframes } from "../../../types";
import { VisualElement } from "../../types";
export declare enum BoundingBoxDimension {
    width = "width",
    height = "height",
    left = "left",
    right = "right",
    top = "top",
    bottom = "bottom"
}
/**
 * Convert value types for x/y/width/height/top/left/bottom/right
 *
 * Allows animation between `'auto'` -> `'100%'` or `0` -> `'calc(50% - 10vw)'`
 *
 * @internal
 */
export declare function unitConversion(visualElement: VisualElement, target: TargetWithKeyframes, origin?: Target, transitionEnd?: Target): {
    target: TargetWithKeyframes;
    transitionEnd?: Target;
};
