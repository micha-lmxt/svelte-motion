<script>
    import { UseSVGProps } from "./utils/use-svg-props";
    import { UseHTMLProps } from "./utils/use-html-props";
    import { filterProps } from "./utils/filter-props";

    export let props,
        visualElement,
        componentType,
        forwardMotionProps = false;
    
</script>

<svelte:component
    this={componentType === 'SVG' ? UseSVGProps : UseHTMLProps}
    {visualElement}
    {props}
    let:visualProps>
    <slot
        motion={visualElement.ref}
        props={{ ...filterProps(props, componentType === 'DOM' || componentType === 'SVG', forwardMotionProps), ...visualProps }} />
</svelte:component>

