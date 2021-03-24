<script>
    import { setContext } from "svelte";
    import { MotionContext } from "./MotionContext";

    export let value;
    setContext(MotionContext, value);
</script>
