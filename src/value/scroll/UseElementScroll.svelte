<script context="module">
    const getElementScrollOffsets = (element) => () => {
        return {
            xOffset: element.scrollLeft,
            yOffset: element.scrollTop,
            xMaxOffset: element.scrollWidth - element.offsetWidth,
            yMaxOffset: element.scrollHeight - element.offsetHeight,
        };
    };
</script>

<script>
    /**
     * Returns MotionValues that update when the provided element scrolls:
     *
     * - `scrollX` — Horizontal scroll distance in pixels.
     * - `scrollY` — Vertical scroll distance in pixels.
     * - `scrollXProgress` — Horizontal scroll progress between `0` and `1`.
     * - `scrollYProgress` — Vertical scroll progress between `0` and `1`.
     *
     * This element must be set to `overflow: scroll` on either or both axes to report scroll offset.
     *
     * @library
     *
     * ```jsx
     * import * as React from "react"
     * import {
     *   Frame,
     *   useElementScroll,
     *   useTransform
     * } from "framer"
     *
     * export function MyComponent() {
     *   const ref = React.useRef()
     *   const { scrollYProgress } = useElementScroll(ref)
     *
     *   return (
     *     <Frame ref={ref}>
     *       <Frame scaleX={scrollYProgress} />
     *     </Frame>
     *   )
     * }
     * ```
     *
     * @motion
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const ref = useRef()
     *   const { scrollYProgress } = useElementScroll(ref)
     *
     *   return (
     *     <div ref={ref}>
     *       <motion.div style={{ scaleX: scrollYProgress }} />
     *     </div>
     *   )
     * }
     * ```
     *
     * @public
     */
     import { UseIsomorphicLayoutEffect } from "../../utils/use-isomorphic-effect"
import {
        createScrollMotionValues,
        createScrollUpdater,
    } from "./utils";
    //import { invariant } from "hey-listen"
    import { addDomEvent } from "../../events/use-dom-event"
    
    export let ref;
    let values = createScrollMotionValues();
</script>
<UseIsomorphicLayoutEffect callback={()=>{
    const element = ref;

    //invariant(
    //    !!element,
    //    "ref provided to useScroll must be passed into a HTML element."
    //)
    if (!element) return

    const updateScrollValues = createScrollUpdater(
        values,
        getElementScrollOffsets(element)
    )

    const scrollListener = addDomEvent(
        element,
        "scroll",
        updateScrollValues,
        { passive: true }
    )

    const resizeListener = addDomEvent(
        element,
        "resize",
        updateScrollValues
    )

    return () => {
        scrollListener && scrollListener()
        resizeListener && resizeListener()
    }
}}/>
<slot {values}/>