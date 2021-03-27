<script>
    export let visualElement;
    const createStyle = (visualElement) => {
        const { vars, style } = visualElement.build();
        
        return { ...vars, ...style };
    };
    $: (styles = createStyle(visualElement));
</script>

<slot {styles} />
