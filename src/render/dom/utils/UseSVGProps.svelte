<script>
    import UseInitialMotionProps from "./UseInitialMotionProps.svelte";
    import { UseStyle } from "./use-html-props";

    export let visualElement, props;

    const getSvgProps = (svgProps, style) => {
        delete style.transform;
        delete style.transformOrigin;

        svgProps.style = style;
        return svgProps;
    };
</script>

<UseInitialMotionProps {visualElement} {props} let:svgProps>
    <UseStyle {visualElement} {props} let:styles >
        <slot visualProps={getSvgProps(svgProps,styles)}/>
    </UseStyle>
</UseInitialMotionProps>
