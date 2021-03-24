<script>
    import { UseSVGProps } from "./utils/use-svg-props";
    import { UseHTMLProps } from "./utils/use-html-props";
    import { filterProps } from "./utils/filter-props";

    export let props,
        visualElement,
        type,
        forwardMotionProps = false;
</script>

<svelte:component
    this={type === 'SVG' ? UseSVGProps : UseHTMLProps}
    let:visualProps>
    <slot
        motion={visualElement.action}
        props={{ ...filterProps(props, type === 'DOM' || type === 'SVG', forwardMotionProps), ...visualProps }} />
</svelte:component>
