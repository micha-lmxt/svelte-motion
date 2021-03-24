<script context="module">
    let presenceId = 0;
    function getPresenceId() {
        const id = presenceId;
        presenceId++;
        return id;
    }
    function newChildrenMap() {
        return new Map();
    }
</script>
<script>
    import { setContext, tick } from "svelte";
    import { PresenceContext } from "./PresenceContext";
    export let isPresent,
        onExitComplete = undefined,
        initial = false,
        custom = undefined,
        presenceAffectsLayout;

    const presenceChildren = new newChildrenMap();
    const id = getPresenceId();
    $: refresh = presenceAffectsLayout ? undefined : isPresent;

    const memoContext = () => ({
        id,
        initial,
        isPresent,
        custom,
        onExitComplete: (childId) => {
            presenceChildren.set(childId, true);
            let allComplete = true;
            presenceChildren.forEach((isComplete) => {
                if (!isComplete) allComplete = false;
            });

            allComplete && onExitComplete?.();
        },
        register: (childId) => {
            presenceChildren.set(childId, false);
            return () => presenceChildren.delete(childId);
        },
    });
    let context = PresenceContext();
    $: $context = memoContext(refresh);
    const keyset = () => {
        presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
    };
    $: keyset(isPresent);
    $: tick().then(() => {
        !isPresent && !presenceChildren.size && onExitComplete?.();
    });
    setContext(PresenceContext, context);
</script>

<slot />
