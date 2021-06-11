/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { LayoutState, TargetProjection } from "../../utils/state";
export declare type ScaleCorrection = (latest: string | number, layoutState: LayoutState, projection: TargetProjection) => string | number;
export interface ScaleCorrectionDefinition {
    process: ScaleCorrection;
    applyTo?: string[];
}
export declare type ScaleCorrectionDefinitionMap = {
    [key: string]: ScaleCorrectionDefinition;
};
