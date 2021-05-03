/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { gestureAnimations } from "../../motion/features/gestures"
import { drag } from "../../motion/features/drag"
import { layoutAnimations } from "../../motion/features/layout";
import { animations } from "../../motion/features/animations";

export const featureBundle = {
    ...animations,
    ...gestureAnimations,
    ...drag,
    ...layoutAnimations,
}
