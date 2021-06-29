<script context="module">
    import { writable } from "svelte/store";
    import { getContext, setContext } from "svelte";
    import { getDomContext, setDomContext } from './DOMcontext'
    export const ScaleCorrectionContext = (isCustom) => getDomContext("ScaleCorrection",isCustom)||writable([]);
    export const ScaleCorrectionParentContext = () => writable([]);

    export const provideScaleCorrection = (isCustom) => {
        const fromParent =
            getContext(ScaleCorrectionContext) || ScaleCorrectionContext(isCustom);

        const ctx = ScaleCorrectionContext();
        setContext(ScaleCorrectionContext, ctx);
        setDomContext("ScaleCorrection", isCustom, ctx)

        setContext(ScaleCorrectionParentContext, fromParent);

    };
</script>

<script>
    export let isCustom;
    provideScaleCorrection(isCustom)
</script>

<slot />
