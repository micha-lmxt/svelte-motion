
<script>
    import { UsePresence } from "../../../components/AnimatePresence/use-presence";
    import  Animate  from "./Animate.svelte";
    export let visualElement,
        props;
        /*initial = undefined,
        style = undefined,
        transformTemplate = undefined,
        transformValues = undefined,*/
        //AnimationProps
        /*animate = undefined,
        exit = undefined,
        variants = undefined,*/
        //transition = undefined,
        //VisualElementLifecycles
        /*onViewportBoxUpdate = undefined,
        onBeforeLayoutMeasure = undefined,
        onLayoutMeasure = undefined,
        onUpdate = undefined,
        onAnimationStart = undefined,
        onAnimationComplete = undefined,
        onLayoutAnimationComplete = undefined,*/
        //GestureHandlers
        // PanHandlers
        /*onPan = undefined,
        onPanStart = undefined,
        onPanSessionStart = undefined,
        onPanEnd = undefined,*/
        // TapHandlers
        /*onTap = undefined,
        onTapStart = undefined,
        onTapCancel = undefined,
        whileTap = undefined,
        //HoverHandlers
        whileHover = undefined,
        onHoverStart = undefined,
        onHoverEnd = undefined,
        //FocusHandlers
        whileFocus = undefined,*/
        //DraggableProps
        /*drag = undefined,
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
        onDragTransitionEnd = undefined,*/
        // LayoutProps
        //layout = undefined
        /*,
        layoutId = undefined,
        //MotionAdvancedProps
        custom = undefined,
        inherit = undefined*/;
    let {transition,layout} = props;
    $: ({transition,layout} = props);
</script>

<UsePresence let:presence>
    <Animate
        {visualElement}
        {transition}
        {layout}
        safeToRemove={presence[1]} />
</UsePresence>
