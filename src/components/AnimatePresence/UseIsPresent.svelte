<script>
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

    import { PresenceContext } from '../../context/PresenceContext.js';
    import { getContext } from "svelte";
    let presenceContext = getContext(PresenceContext) || PresenceContext();
</script>

<slot
    isPresent={$presenceContext === null ? true : $presenceContext.isPresent} />
