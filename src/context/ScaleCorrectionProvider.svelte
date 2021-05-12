<script context="module">
    import {writable} from 'svelte/store'
    export const ScaleCorrectionContext = ()=>writable([])
    export const ScaleCorrectionParentContext = ()=>writable([])
</script>
<script>
    import {getContext,setContext} from 'svelte';
    const fromParent = getContext(ScaleCorrectionContext)||ScaleCorrectionContext();
    setContext(ScaleCorrectionContext,ScaleCorrectionContext());
    setContext(ScaleCorrectionParentContext,fromParent)
</script>
<slot/>