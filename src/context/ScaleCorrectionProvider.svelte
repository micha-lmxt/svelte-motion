<script context="module">
    import { writable } from "svelte/store";
    import { getContext, setContext } from "svelte";
    export const ScaleCorrectionContext = () => writable([]);
    export const ScaleCorrectionParentContext = () => writable([]);

    export const provideScaleCorrection = () => {
        const fromParent =
            getContext(ScaleCorrectionContext) || ScaleCorrectionContext();

        setContext(ScaleCorrectionContext, ScaleCorrectionContext());

        setContext(ScaleCorrectionParentContext, fromParent);
    };
</script>

<script>
    provideScaleCorrection()
</script>

<slot />
