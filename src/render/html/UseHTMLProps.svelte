<script>
    import UseStyle from "./UseStyle.svelte";

    export let props,
        visualState,
        isStatic;

    
    const getHTMLProps = (style, props) => {
        let htmlProps={};
        if (Boolean(props.drag)) {
            
            // Disable the ghost element when a user drags
            htmlProps.draggable = false;

            // Disable text selection
            style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout =
                "none";

            // Disable scrolling on the draggable direction
            style.touchAction =
                props.drag === true
                    ? "none"
                    : `pan-${props.drag === "x" ? "y" : "x"}`;
        }

        htmlProps.style = style;
        return htmlProps;
    };
</script>

<UseStyle let:styles {visualState} {props} {isStatic}>
    <slot visualProps={getHTMLProps(styles,props)} />
</UseStyle>
