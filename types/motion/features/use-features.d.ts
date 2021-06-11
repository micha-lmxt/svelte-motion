/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VisualElement } from "../../render/types";
import { MotionProps } from "../types";
import { FeatureBundle } from "./types";
/**
 * Load features via renderless components based on the provided MotionProps.
 */
export declare function useFeatures(props: MotionProps, visualElement?: VisualElement, preloadedFeatures?: FeatureBundle): null | JSX.Element[];
