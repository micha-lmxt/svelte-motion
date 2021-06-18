<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

    import { usePresence } from "../../../components/AnimatePresence/use-presence";
    import Animate from "./Animate.svelte";
    export let visualElement, props;

    let { layout } = props;
    $: ({ layout } = props);
    const presence = usePresence();
</script>

<Animate {visualElement} {layout} safeToRemove={$presence[1]} />
