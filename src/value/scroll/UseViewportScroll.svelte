<script context="module">
    import { writable, get } from "svelte/store";
    import { createScrollUpdater } from "./utils.js";
    import { addDomEvent } from "../../events/use-dom-event"

    let viewportScrollValues = writable(undefined);

    function getViewportScrollOffsets() {
        return {
            xOffset: window.pageXOffset,
            yOffset: window.pageYOffset,
            xMaxOffset: document.body.clientWidth - window.innerWidth,
            yMaxOffset: document.body.clientHeight - window.innerHeight,
        };
    }

    let hasListeners = writable(false);

    function addEventListeners() {
        hasListeners.set(true);
        if (typeof window === "undefined") return;

        const updateScrollValues = createScrollUpdater(
            get(viewportScrollValues),
            getViewportScrollOffsets
        );

        addDomEvent(window, "scroll", updateScrollValues, { passive: true });
        addDomEvent(window, "resize", updateScrollValues);
    }
</script>

<script>

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
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import {
 *   Frame,
 *   useViewportScroll,
 *   useTransform
 * } from "framer"
 *
 * export function MyComponent() {
 *   const { scrollYProgress } = useViewportScroll()
 *   return <Frame scaleX={scrollYProgress} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const { scrollYProgress } = useViewportScroll()
 *   return <motion.div style={{ scaleX: scrollYProgress }} />
 * }
 * ```
 *
 * @public
 */
    import { createScrollMotionValues } from "./utils";
    import { UseIsomorphicLayoutEffect } from "../../utils/use-isomorphic-effect"

    $: if (!$viewportScrollValues) {
        $viewportScrollValues = createScrollMotionValues();
    }
</script>
<UseIsomorphicLayoutEffect callback={()=>{
    !$hasListeners && addEventListeners()
}}/>
<slot viewportScrollValues={$viewportScrollValues}/>