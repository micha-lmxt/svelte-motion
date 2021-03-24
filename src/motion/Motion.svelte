<script>
    import { MotionConfigContext } from "./context/MotionConfigContext";
    import { UseVisualElement } from "./utils/use-visual-element";
    import { UseFeatures } from "./features/use-features";
    import  MotionContextProvider  from "./context/MotionContextProvider.svelte"
    import { getContext } from "svelte";
    import { UseRender} from '../render/dom/use-render';

   
    
    export let props,
        defaultFeatures,
        createVisualElement,
        forwardMotionProps,
        Component,
        externalRef;
    

        /**
         * If a component is static, we only visually update it as a
         * result of a React re-render, rather than any interactions or animations.
         * If this component or any ancestor is static, we disable hardware acceleration
         * and don't load any additional functionality.
         */
    const a = getContext(MotionConfigContext)||MotionConfigContext();
    $: ({isStatic} = $a||{});

    let elementRef;

</script>

<UseVisualElement
    {createVisualElement}
    {props}
    {isStatic}
    ref={externalRef}
    let:visualElement>
    <UseFeatures
        {defaultFeatures}
        {isStatic}
        {visualElement}
        {props}
        let:features>
        <UseRender {props} {visualElement} {forwardMotionProps} componentType={Component} let:motion let:props={renderProps}>
            <MotionContextProvider value={visualElement}>
                <slot {motion} props={renderProps} />
            </MotionContextProvider>
        </UseRender>

        {#each features as feat (feat.key)}
            <svelte:component this={feat.component} {...feat.props}/>
        {/each}
    </UseFeatures>
</UseVisualElement>
