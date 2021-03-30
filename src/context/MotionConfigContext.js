import { writable } from "svelte/store";


/**
 * @public
 */
var MotionConfigContext = ()=> writable({
    transformPagePoint: function (p) { return p; },
    isStatic: false,
});

export { MotionConfigContext };
