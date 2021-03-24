<script>
    import {UseGestures} from "../../gestures/use-gestures";


    $: ({visualElement,...props} = $$props);
</script>
<UseGestures {props} {visualElement}/>