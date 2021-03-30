<script>
    import { PresenceContext } from '../../context/PresenceContext.js';
    import { getContext } from "svelte";
    let presenceContext = getContext(PresenceContext) || PresenceContext();
</script>

<slot
    isPresent={$presenceContext === null ? true : $presenceContext.isPresent} />
