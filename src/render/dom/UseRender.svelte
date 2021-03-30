<script>
import { UseSVGProps } from "../svg/use-props"
import { UseHTMLProps } from "../html/use-props"
import { filterProps } from "./utils/filter-props"

    export let props,
        visualState,
        Component,
        forwardMotionProps = false,
        isStatic,
        ref;
    $: (filteredProps = filterProps(
            props,
            typeof Component === "string",
            forwardMotionProps
        ))
</script>

<svelte:component
    this={Component === 'SVG' ? UseSVGProps : UseHTMLProps}
    {visualState}
    {isStatic}
    {props}
    let:visualProps>
    <slot
        motion={ref}
        props={{...filteredProps,...visualProps}} />
</svelte:component>

