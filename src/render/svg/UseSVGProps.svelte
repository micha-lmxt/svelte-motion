<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import { createSvgRenderState } from "./utils/create-render-state";
    import { copyRawValuesOnly } from "../html/use-props";
    import { buildSVGAttrs } from "./utils/build-attrs";

    export let visualState, props;
    let memo = () => {
        const state = createSvgRenderState();
        buildSVGAttrs(
            state,
            visualState,
            undefined,
            undefined,
            { enableHardwareAcceleration: false },
            props.transformTemplate
        );
        return {
            ...state.attrs,
            style: { ...state.style },
        };
    };
    $: visualProps = memo(visualState);

    $: if (props.style) {
            const rawStyles = {};
            copyRawValuesOnly(rawStyles, props.style, props);
            visualProps.style = { ...rawStyles, ...visualProps.style };
        }
    
</script>

<slot {visualProps} />
