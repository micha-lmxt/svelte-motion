<script>
    import { MotionConfigContext } from "./context/MotionConfigContext";
    import { UseVisualElement } from "./utils/use-visual-element";
    import { UseFeatures } from "./features/use-features";
    import MotionContextProvider from "./context/MotionContextProvider.svelte";
    import { getContext} from "svelte";
    import { UseRender } from "../render/dom/use-render.js";
    import { createDomVisualElement } from "../render/dom/create-dom-visual-element.js";

    export let isSVG = false,
        isCustom = false,
        features,
        forwardMotionProps = false,
        externalRef = undefined,
        initial = undefined,
        style = undefined,
        transformTemplate = undefined,
        transformValues = undefined,
        //AnimationProps
        animate = undefined,
        exit = undefined,
        variants = undefined,
        transition = undefined,
        //VisualElementLifecycles
        onViewportBoxUpdate = undefined,
        onBeforeLayoutMeasure = undefined,
        onLayoutMeasure = undefined,
        onUpdate = undefined,
        onAnimationStart = undefined,
        onAnimationComplete = undefined,
        onLayoutAnimationComplete = undefined,
        //GestureHandlers
        // PanHandlers
        onPan = undefined,
        onPanStart = undefined,
        onPanSessionStart = undefined,
        onPanEnd = undefined,
        // TapHandlers
        onTap = undefined,
        onTapStart = undefined,
        onTapCancel = undefined,
        whileTap = undefined,
        //HoverHandlers
        whileHover = undefined,
        onHoverStart = undefined,
        onHoverEnd = undefined,
        //FocusHandlers
        whileFocus = undefined,
        //DraggableProps
        drag = undefined,
        whileDrag = undefined,
        dragDirectionLock = undefined,
        dragPropagation = undefined,
        dragConstraints = undefined,
        dragElastic = undefined,
        dragMomentum = undefined,
        dragTransition = undefined,
        dragControls = undefined,
        dragListener = undefined,
        onMeasureDragConstraints = undefined,
        _dragX = undefined,
        _dragY = undefined,
        //DragHandlers
        onDragStart = undefined,
        onDragEnd = undefined,
        onDrag = undefined,
        onDirectionLock = undefined,
        onDragTransitionEnd = undefined,
        // LayoutProps
        layout = undefined,
        layoutId = undefined,
        //MotionAdvancedProps
        custom = undefined,
        inherit = undefined;

    //layout=undefined;
    $: motionProps = {
        initial,
        style,
        transformTemplate,
        transformValues,
        //AnimationProps
        animate,
        exit,
        variants,
        transition,
        //VisualElementLifecycles
        onViewportBoxUpdate,
        onBeforeLayoutMeasure,
        onLayoutMeasure,
        onUpdate,
        onAnimationStart,
        onAnimationComplete,
        onLayoutAnimationComplete,
        //GestureHandlers
        // PanHandlers
        onPan,
        onPanStart,
        onPanSessionStart,
        onPanEnd,
        // TapHandlers
        onTap,
        onTapStart,
        onTapCancel,
        whileTap,
        //HoverHandlers
        whileHover,
        onHoverStart,
        onHoverEnd,
        //FocusHandlers
        whileFocus,
        //DraggableProps
        drag,
        whileDrag,
        dragDirectionLock,
        dragPropagation,
        dragConstraints,
        dragElastic,
        dragMomentum,
        dragTransition,
        dragControls,
        dragListener,
        onMeasureDragConstraints,
        _dragX,
        _dragY,
        //DragHandlers
        onDragStart,
        onDragEnd,
        onDrag,
        onDirectionLock,
        onDragTransitionEnd,
        // LayoutProps
        layout,
        layoutId,
        //MotionAdvancedProps
        custom,
        inherit,
    };
    //$: (allProps = {...motionProps,$$restProps});

    let Component = isSVG ? "SVG" : isCustom ? "Custom" : "DOM";
    let createVisualElement = createDomVisualElement(Component);
    /**
     * If a component is static, we only visually update it as a
     * result of a React re-render, rather than any interactions or animations.
     * If this component or any ancestor is static, we disable hardware acceleration
     * and don't load any additional functionality.
     */
    const a = getContext(MotionConfigContext) || MotionConfigContext();
    $: ({ isStatic } = $a || {});
    
</script>

<UseVisualElement
    {createVisualElement}
    props={motionProps}
    {isStatic}
    ref={externalRef}
    let:visualElement>
    <UseFeatures
        defaultFeatures={features}
        {isStatic}
        {visualElement}
        props={motionProps}
        let:features={_features}>
        <UseRender
            props={motionProps}
            {visualElement}
            {forwardMotionProps}
            componentType={Component}
            let:motion
            let:props={renderProps}>
            <MotionContextProvider value={visualElement}>
                <slot {motion} props={renderProps} />
            </MotionContextProvider>
        </UseRender>
        {#each _features as feat (feat.key)}
       
            <svelte:component this={feat.Component} {...feat.props} />
        {/each}
    </UseFeatures>
</UseVisualElement>
