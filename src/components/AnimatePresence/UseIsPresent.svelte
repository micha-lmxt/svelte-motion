<script>
    import { PresenceContext } from "./PresenceContext";
    import { getContext } from "svelte";
    let presenceContext = getContext(PresenceContext) || PresenceContext();
</script>

<slot
    isPresent={$presenceContext === null ? true : $presenceContext.isPresent} />
