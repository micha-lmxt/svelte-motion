import { UseFocusGesture } from '../../gestures/use-focus-gesture.js';
import { UseHoverGesture } from '../../gestures/use-hover-gesture.js';
import { UseTapGesture } from '../../gestures/use-tap-gesture.js';
/**
 * @public
 */
const gestureAnimations = {
    tap: UseTapGesture,
    focus: UseFocusGesture,
    hover: UseHoverGesture,
};

export { gestureAnimations };
