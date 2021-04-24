<script>
/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

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
