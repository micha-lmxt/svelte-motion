<script>

import { UsePresence } from "../../components/AnimatePresence/use-presence"
import { getContext } from "svelte";
import { PresenceContext } from "../../components/AnimatePresence/PresenceContext";



    export let custom,
        visualElement;
    const presenceContext = getContext(PresenceContext)||PresenceContext();

    const effect = (isPresent,onExitComplete)=> {
        const animation = visualElement.animationState?.setActive(
            AnimationType.Exit,
            !isPresent,
            { custom: presenceContext?.custom ?? custom }
        )

        !isPresent && animation?.then(onExitComplete)
    }
</script>

<UsePresence let:presence>{effect(presence.isPresent,presence.onExitComplete)}</UsePresence>