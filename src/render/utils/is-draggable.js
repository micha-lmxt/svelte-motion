/** 
based on framer-motion@4.1.11,
Copyright (c) 2018 Framer B.V.
*/
function isDraggable(visualElement) {
    var _a = visualElement.getProps(), drag = _a.drag, _dragX = _a._dragX;
    return drag && !_dragX;
}

export { isDraggable };
