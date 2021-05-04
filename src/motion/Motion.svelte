<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
    import { MotionConfigContext } from "../context/MotionConfigContext"
    import { UseVisualElement } from "./utils/use-visual-element";
    import { UseFeatures } from "./features/use-features";
    import MotionContextProvider from "../context/MotionContext/MotionContextProvider.svelte";
    import { getContext} from "svelte";
    import { UseRender } from "../render/dom/use-render.js";
    import { createDomVisualElement } from "../render/dom/create-visual-element.js";
    import { svgMotionConfig } from '../render/svg/config-motion.js'
    import { htmlMotionConfig } from '../render/html/config-motion.js'
    import {UseCreateMotionContext} from "../context/MotionContext/create";
    import {UseVisualState} from './utils/use-visual-state.js';
    import {useMotionRef} from "./utils/use-motion-ref.js";
import Animate from "./features/layout/Animate.svelte";


    export let isSVG = false,
        isCustom = false,
        forwardMotionProps = false,
        externalRef=undefined,
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
        inherit = undefined,
        update=undefined;

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
        ...(isSVG?$$restProps:{})
    };
    //$: (allProps = {...motionProps,$$restProps});

    let Component = isSVG ? "SVG" : isCustom ? "Custom" : "DOM";
    let createVisualElement = createDomVisualElement;
    let visualStateConfig = isSVG ? svgMotionConfig : htmlMotionConfig;

    /**
     * If a component is static, we only visually update it as a
     * result of a React re-render, rather than any interactions or animations.
     * If this component or any ancestor is static, we disable hardware acceleration
     * and don't load any additional functionality.
     */
    const a = getContext(MotionConfigContext) || MotionConfigContext();
    $: ({ isStatic } = $a || {});
    let mounted=false;
    const setContext = (c,v)=>{
        c.visualElement = v;
        return v
    }
    
</script>
<UseCreateMotionContext 
props={motionProps} 
{isStatic} 
let:value={context}>
    <UseVisualState 
    config={visualStateConfig} 
    props={motionProps}
    {isStatic} 
    let:state={visualState}>
    <UseVisualElement
        {Component}
        {visualState}
        {createVisualElement}
        props={motionProps}
        let:visualElement>
        <UseFeatures
            visualElement={setContext(context,visualElement)}
            props={motionProps}
            let:features={_features}>
            
            <MotionContextProvider value={context}>
            <UseRender
                {Component}
                props={motionProps}
                ref={useMotionRef(
                    visualState,
                    context.visualElement,
                    externalRef
                )}
                {visualState}
                {isStatic}
                {forwardMotionProps}
                let:motion
                let:props={renderProps}>
                
                    <slot motion={(node)=>{motion(node);mounted=true;}} props={renderProps} />
                
            </UseRender>
            </MotionContextProvider>
            
            
            {#if mounted}
            {#each _features as feat (feat.key)}
                
                <svelte:component this={feat.Component} props={feat.props} visualElement={feat.visualElement} {...(feat.key==="measureLayout"?{update}:{})}/>
            {/each}
           {/if}
        </UseFeatures>
    </UseVisualElement>
</UseVisualState>
</UseCreateMotionContext>
