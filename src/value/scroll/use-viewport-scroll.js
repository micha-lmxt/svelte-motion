/** 
based on framer-motion@4.1.16,
Copyright (c) 2018 Framer B.V.
*/
import {
    createScrollMotionValues,
    createScrollUpdater,
} from "./utils"
import { addDomEvent } from "../../events/use-dom-event"
import { tick } from "svelte"

let viewportScrollValues


function getViewportScrollOffsets() {
    return {
        xOffset: window.pageXOffset,
        yOffset: window.pageYOffset,
        xMaxOffset: document.body.clientWidth - window.innerWidth,
        yMaxOffset: document.body.clientHeight - window.innerHeight,
    }
}

let hasListeners = false

function addEventListeners() {
    hasListeners = true
    if (typeof window === "undefined") return

    const updateScrollValues = createScrollUpdater(
        viewportScrollValues,
        getViewportScrollOffsets
    )

    addDomEvent(window, "scroll", updateScrollValues, { passive: true })
    addDomEvent(window, "resize", updateScrollValues)
}

/**
 * Returns MotionValues that update when the viewport scrolls:
 *
 * - `scrollX` — Horizontal scroll distance in pixels.
 * - `scrollY` — Vertical scroll distance in pixels.
 * - `scrollXProgress` — Horizontal scroll progress between `0` and `1`.
 * - `scrollYProgress` — Vertical scroll progress between `0` and `1`.
 *
 * **Warning:** Setting `body` or `html` to `height: 100%` or similar will break the `Progress`
 * values as this breaks the browser's capability to accurately measure the page length.
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const { scrollYProgress } = useViewportScroll()
 *   return <MotionDiv style={{ scaleX: scrollYProgress }} />
 * }
 * ```
 *
 * @public
 */
export function useViewportScroll() {
    /**
     * Lazy-initialise the viewport scroll values
     */
    if (!viewportScrollValues) {
        viewportScrollValues = createScrollMotionValues()
    }

    tick().then(_=>{
        !hasListeners && addEventListeners()
    })
    
    return viewportScrollValues
}
