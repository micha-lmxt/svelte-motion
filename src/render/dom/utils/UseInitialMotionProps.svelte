<script>
    import { isMotionValue } from "../../../value/utils/is-motion-value"
    import { UseConstant } from "../../../utils/use-constant";

    export let visualElement,
        props;
    const createAttrs = (visualElement,props) => {
        const { attrs } = visualElement.build();
        const resolvedMotionValueProps = {};

        for (const key in props) {
            if (isMotionValue(props[key])) {
                resolvedMotionValueProps[key] = props[key].get();
            }
        }

        return { ...attrs, ...resolvedMotionValueProps };
    };
    
</script>
{#if visualElement.isStatic}
    <slot svgProps={createAttrs(visualElement,props)}/>
{:else}
    <UseConstant init={createAttrs} let:ref>
        <slot svgProps={ref}/>
    </UseConstant>
{/if}