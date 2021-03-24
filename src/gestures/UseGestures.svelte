<script>
import { UsePanGesture } from "./use-pan-gesture";
import { UseTapGesture } from "./use-tap-gesture"
import { UseHoverGesture } from "./use-hover-gesture"
import { UseFocusGesture } from "./use-focus-gesture"

    export let props,
        visualElement;
</script>
<UsePanGesture {props} {visualElement}/>
<UseTapGesture {props} {visualElement}/>
<UseHoverGesture {props} {visualElement}/>
<UseFocusGesture {props} {visualElement}/>
<slot/>