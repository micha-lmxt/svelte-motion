<script>
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    
import { UsePresence } from "../../components/AnimatePresence/use-presence"
import { getContext } from "svelte";
import { PresenceContext } from "../../context/PresenceContext";
import { AnimationType } from "../../render/utils/types";

    

    export let props,
        visualElement;
    $: ({custom} = props);
    const presenceContext = getContext(PresenceContext)||PresenceContext();

    const effect = (isPresent,onExitComplete)=> {
        const animation = visualElement.animationState?.setActive(
            AnimationType.Exit,
            !isPresent,
            { custom: $presenceContext?.custom ?? custom }
        )

        !isPresent && animation?.then(onExitComplete)
        return "";
    }
</script>

<UsePresence let:presence>{effect(presence[0],presence[1])}<slot/></UsePresence>
