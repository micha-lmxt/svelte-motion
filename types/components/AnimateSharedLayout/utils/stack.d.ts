/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { VisualElement } from "../../../render/types";
export declare type LeadAndFollow = [
    VisualElement | undefined,
    VisualElement | undefined
];
export interface LayoutStack {
    add(element: VisualElement): void;
    remove(element: VisualElement): void;
    getLead(): VisualElement | undefined;
    updateSnapshot(): void;
    clearSnapshot(): void;
    animate(element: VisualElement, crossfade: boolean): void;
    updateLeadAndFollow(): void;
}
export declare function layoutStack(): LayoutStack;
