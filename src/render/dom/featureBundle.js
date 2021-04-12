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