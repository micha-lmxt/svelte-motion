<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

    import { usePresence } from "../../components/AnimatePresence/use-presence";
    import { getContext } from "svelte";
    import { PresenceContext } from "../../context/PresenceContext";
    import { AnimationType } from "../../render/utils/types";

    export let props, visualElement;
    $: ({ custom } = props);

    const presenceContext = getContext(PresenceContext) || PresenceContext();
    const presence = usePresence();

    const effect = (pres) => {
        const [isPresent, onExitComplete] = pres;
        
        const animation = visualElement.animationState?.setActive(
            AnimationType.Exit,
            !isPresent,
            { custom: $presenceContext?.custom ?? custom }
        );

        !isPresent && animation?.then(onExitComplete);
        return "";
    };
    $: effect($presence)
</script>

<slot />

