<script>
    import { UseDrag } from "../../gestures/drag/use-drag";
    $: ({ visualElement, ...props } = $$props);
</script>
<UseDrag props={props} {visualElement}/>