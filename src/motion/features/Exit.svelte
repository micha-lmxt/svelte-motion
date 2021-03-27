<script>

import { UsePresence } from "../../components/AnimatePresence/use-presence"
import { getContext } from "svelte";
import { PresenceContext } from "../../components/AnimatePresence/PresenceContext";
import { AnimationType } from "../../render/utils/types";

    

    export let custom,
        visualElement;
    const presenceContext = getContext(PresenceContext)||PresenceContext();

    const effect = (isPresent,onExitComplete)=> {
        console.log(isPresent,onExitComplete)
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