/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { PlaybackControls } from "popmotion";
import { ResolvedValues, VisualElement } from "../../../render/types";
import { Transition } from "../../../types";
export interface Crossfader {
    isActive(): boolean;
    getCrossfadeState(element: VisualElement): ResolvedValues | undefined;
    toLead(transition?: Transition): PlaybackControls;
    fromLead(transition?: Transition): PlaybackControls;
    setOptions(options: CrossfadeAnimationOptions): void;
    reset(): void;
    stop(): void;
    getLatestValues(): ResolvedValues;
}
export interface CrossfadeAnimationOptions {
    lead?: VisualElement;
    follow?: VisualElement;
    prevValues?: ResolvedValues;
    crossfadeOpacity?: boolean;
    preserveFollowOpacity?: boolean;
}
export declare function createCrossfader(): Crossfader;
