<script>
import { UseDomEvent } from "../events/use-dom-event"

    export let props,
        visualElement;
    $: ( {whileFocus} = props);
    const onFocus = () => {
        visualElement.animationState?.setActive(AnimationType.Focus, true)
    }

    const onBlur = () => {
        visualElement.animationState?.setActive(AnimationType.Focus, false)
    }
</script>
<UseDomEvent ref={visualElement} eventName="focus" handler={whileFocus ? onFocus : undefined}>
    <UseDomEvent ref={visualElement} eventName="blur" handler={whileFocus ? onBlur : undefined}>
        <slot/>    
    </UseDomEvent>
</UseDomEvent>