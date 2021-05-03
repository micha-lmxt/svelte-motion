<script context="module">
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import { motionValue } from "../value";
    import { writable, get } from "svelte/store";
    // Does this device prefer reduced motion? Returns `null` server-side.
    let prefersReducedMotion = writable(undefined);
    function initPrefersReducedMotion() {
        prefersReducedMotion.set(motionValue(null));

        if (typeof window === "undefined") return;

        if (window.matchMedia) {
            const motionMediaQuery = window.matchMedia(
                "(prefers-reduced-motion)"
            );

            const setReducedMotionPreferences = () =>
                get(prefersReducedMotion).set(motionMediaQuery.matches);

            motionMediaQuery.addListener(setReducedMotionPreferences);

            setReducedMotionPreferences();
        } else {
            get(prefersReducedMotion).set(false);
        }
    }
</script>

<script>


    /**
     * A hook that returns `true` if we should be using reduced motion based on the current device's Reduced Motion setting.
     *
     * This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing motion-sickness inducing
     * `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.
     *
     * It will actively respond to changes and re-render your components with the latest setting.
     *
     * ```jsx
     * export function Sidebar({ isOpen }) {
     *   const shouldReduceMotion = useReducedMotion()
     *   const closedX = shouldReduceMotion ? 0 : "-100%"
     *
     *   return (
     *     <motion.div animate={{
     *       opacity: isOpen ? 1 : 0,
     *       x: isOpen ? 0 : closedX
     *     }} />
     *   )
     * }
     * ```
     *
     * @return boolean
     *
     * @public
     */
    !$prefersReducedMotion && initPrefersReducedMotion()

    let shouldReduceMotion = get(prefersReducedMotion).get();
    $: (isMotionValue($prefersReducedMotion) ? $prefersReducedMotion.onChange((v)=>shouldReduceMotion=v) : undefined)
</script>
<slot {shouldReduceMotion}/>
