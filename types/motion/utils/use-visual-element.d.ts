/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import * as React from "react";
import { MotionProps } from "../../motion/types";
import { CreateVisualElement, VisualElement } from "../../render/types";
import { VisualState } from "./use-visual-state";
export declare function useVisualElement<Instance, RenderState>(Component: string | React.ComponentType, visualState: VisualState<Instance, RenderState>, props: MotionProps, createVisualElement?: CreateVisualElement<Instance>): VisualElement<Instance> | undefined;
