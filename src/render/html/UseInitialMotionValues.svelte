<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import { buildHTMLStyles } from "./utils/build-styles";

    import { createHtmlRenderState } from "./utils/create-render-state";
    export let visualState, isStatic, props;
    const memo = ()=>{
        let state = createHtmlRenderState();

        buildHTMLStyles(
            state,
            visualState,
            undefined,
            undefined,
            { enableHardwareAcceleration: !isStatic },
            props.transformTemplate
        );

        const { vars, style } = state
        return { ...vars, ...style }
    }
    $: (styles = memo(visualState));
</script>

<slot {styles} />
