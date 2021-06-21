/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

export { VisibilityAction } from './components/AnimateSharedLayout/types.js';
export { MotionValue, motionValue } from './value/index.js';
export { MotionConfig } from "./components/MotionConfig"
export { animateVisualElement } from './render/utils/animation.js';
export { animationControls } from './animation/animation-controls.js';
export { addScaleCorrection } from './render/dom/projection/scale-correction.js';
export { visualElement } from './render/index.js';
export { isValidMotionProp } from './motion/utils/valid-prop.js';
export { MotionConfigContext } from './context/MotionConfigContext.js';
export { PresenceContext } from './context/PresenceContext.js';
export { useIsPresent, usePresence } from './components/AnimatePresence/use-presence.js';
export { LayoutGroupContext } from './context/LayoutGroupContext.js';
export { createBatcher } from './components/AnimateSharedLayout/utils/batcher.js';
export { FramerTreeLayoutContext, SharedLayoutContext } from './context/SharedLayoutContext.js';
export { createMotionComponent } from './motion/index.js';
export { UseDomEvent } from './events/use-dom-event.js';

export { UsePanGesture } from './gestures/use-pan-gesture.js';
export { UseTapGesture } from './gestures/use-tap-gesture.js';
export { UseGestures } from './gestures/use-gestures.js';

export { Motion } from './render/dom/motion.js';
export { M } from './render/dom/motion-proxy.js';
export { default as MotionSSR } from './motion/MotionSSR.svelte';

export { AnimatePresence } from './components/AnimatePresence/index.js';
export { animate } from './animation/animate.js';
export { createCrossfader } from './components/AnimateSharedLayout/utils/crossfader.js';
export { AnimateSharedLayout } from './components/AnimateSharedLayout/index.js';
export { useMotionValue } from './value/use-motion-value.js';
export { useMotionTemplate } from './value/use-motion-template.js';
export { resolveMotionValue } from './value/utils/resolve-motion-value.js';
export { transform } from './utils/transform.js';
export { useTransform } from './value/use-transform.js';
export { useSpring } from './value/use-spring.js';
export { useElementScroll } from './value/scroll/use-element-scroll.js';
export { useViewportScroll } from './value/scroll/use-viewport-scroll.js';
export { useReducedMotion } from './utils/use-reduced-motion.js';
export { UseAnimation, useAnimation } from './animation/use-animation.js';
export { useCycle } from './utils/use-cycle.js';
export { DragControls, useDragControls } from './gestures/drag/use-drag-controls.js';
export { useVelocity } from './value/use-velocity';

export {default as Mdiv, default as MotionDiv} from './components/MotionDiv.svelte';