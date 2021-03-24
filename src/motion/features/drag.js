import DragComp from './Drag.svelte'
/**
 * @public
 */
var Drag = {
    key: "drag",
    shouldRender: function (props) { return !!props.drag || !!props.dragControls; },
    getComponent: function () { return DragComp; },
};

export { Drag };
