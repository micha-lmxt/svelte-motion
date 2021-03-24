<script>
    import { UsePresence } from "../../../components/AnimatePresence/use-presence";
    import  Animate  from "./Animate.svelte";
    export let visualElement,
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
</script>

<UsePresence let:presence>
    <Animate
        {visualElement}
        {initial}
        {style}
        {transformTemplate}
        {transformValues}
        {animate}
        {exit}
        {variants}
        {transition}
        {onViewportBoxUpdate}
        {onBeforeLayoutMeasure}
        {onLayoutMeasure}
        {onUpdate}
        {onAnimationStart}
        {onAnimationComplete}
        {onLayoutAnimationComplete}
        {onPan}
        {onPanStart}
        {onPanSessionStart}
        {onPanEnd}
        {onTap}
        {onTapStart}
        {onTapCancel}
        {whileTap}
        {whileHover}
        {onHoverStart}
        {onHoverEnd}
        {whileFocus}
        {drag}
        {whileDrag}
        {dragDirectionLock}
        {dragPropagation}
        {dragConstraints}
        {dragElastic}
        {dragMomentum}
        {dragTransition}
        {dragControls}
        {dragListener}
        {onMeasureDragConstraints}
        {_dragX}
        {_dragY}
        {onDragStart}
        {onDragEnd}
        {onDrag}
        {onDirectionLock}
        {onDragTransitionEnd}
        {layout}
        {layoutId}
        {custom}
        {inherit}
        safeToRemove={presence[1]} />
</UsePresence>
