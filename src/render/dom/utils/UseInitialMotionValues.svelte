<script>
    import {UseConstant} from "../../../utils/use-constant";

    export let visualElement;
    const createStyle = (visualElement) => {
        const { vars, style } = visualElement.build();
        return { ...vars, ...style };
    };
</script>

{#if visualElement.isStatic}
    <slot styles={createStyle(visualElement)} />
{:else}
    <UseConstant init={createStyle} let:ref>
        <slot styles={ref} />
    </UseConstant>
{/if}
