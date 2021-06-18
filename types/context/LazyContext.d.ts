/// <reference types="react" />
/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { CreateVisualElement } from "../render/types";
export interface LazyContextProps {
    renderer?: CreateVisualElement<any>;
    strict: boolean;
}
export declare const LazyContext: import("react").Context<LazyContextProps>;
