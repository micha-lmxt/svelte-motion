/// <reference types="react" />
/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VisualElement } from "../../render/types";
export interface MotionContextProps {
    visualElement?: VisualElement;
    initial?: false | string | string[];
    animate?: string | string[];
}
export declare const MotionContext: import("react").Context<MotionContextProps>;
export declare function useVisualElementContext(): VisualElement<any, any> | undefined;
