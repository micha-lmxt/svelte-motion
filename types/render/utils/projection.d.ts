/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { ResolvedValues, VisualElement } from "../types";
import { LayoutState, TargetProjection } from "./state";
export declare function updateLayoutDeltas({ delta, layout, layoutCorrected, treeScale }: LayoutState, { target }: TargetProjection, treePath: VisualElement[], transformOrigin: ResolvedValues): void;
