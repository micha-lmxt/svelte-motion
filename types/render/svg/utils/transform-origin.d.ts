/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { SVGDimensions } from "../types";
/**
 * The SVG transform origin defaults are different to CSS and is less intuitive,
 * so we use the measured dimensions of the SVG to reconcile these.
 */
export declare function calcSVGTransformOrigin(dimensions: SVGDimensions, originX: number | string, originY: number | string): string;
