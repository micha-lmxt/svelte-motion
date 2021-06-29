<script>
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

import { onMount } from "svelte";
import { writable } from "svelte/store";
import { setDomContext } from "../../context/DOMcontext";

    import { LazyContext } from "../../context/LazyContext";
    import { loadFeatures } from "../../motion/features/definitions";
    /**
     * Used in conjunction with the `m` component to reduce bundle size.
     *
     * `m` is a version of the `motion` component that only loads functionality
     * critical for the initial render.
     *
     * `LazyMotion` can then be used to either synchronously or asynchronously
     * load animation and gesture support.
     *
     * ```jsx
     * // Synchronous loading
     * import { LazyMotion, m, domAnimations } from "framer-motion"
     *
     * function App() {
     *   return (
     *     <LazyMotion features={domAnimations}>
     *       <m.div animate={{ scale: 2 }} />
     *     </LazyMotion>
     *   )
     * }
     *
     * // Asynchronous loading
     * import { LazyMotion, m } from "framer-motion"
     *
     * function App() {
     *   return (
     *     <LazyMotion features={() => import('./path/to/domAnimations')}>
     *       <m.div animate={{ scale: 2 }} />
     *     </LazyMotion>
     *   )
     * }
     * ```
     *
     * @public
     */
        export let features,
            strict=false,
            isCustom=false;
    let _ = !isLazyBundle(features);
    let loadedRenderer = undefined
        /**
     * If this is a synchronous load, load features immediately
     */
     $: if (!isLazyBundle(features,_)) {
        const { renderer, ...loadedFeatures } = features
        loadedRenderer.current = renderer
        loadFeatures(loadedFeatures)
    }
    function isLazyBundle(features) {
        return typeof features === "function";
    }
    onMount(()=>{
        if (isLazyBundle(features)) {
            features().then(({ renderer, ...loadedFeatures }) => {
                loadFeatures(loadedFeatures)
                loadedRenderer.current = renderer
                setIsLoaded(true)
            })
        }
    })
    let context = writable({ renderer: loadedRenderer.current, strict })
    setContext(LazyContext,context);
    setDomContext("Lazy",isCustom,context)
    $: context.set({ renderer: loadedRenderer.current, strict })
</script>
<slot/>
