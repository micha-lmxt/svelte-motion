import { writable } from "svelte/store";
import { getDomContext } from "./DOMcontext";


/**
 * @public
 */
var MotionConfigContext = (c)=> getDomContext("MotionConfig",c)||writable({
    transformPagePoint: function (p) { return p; },
    isStatic: false,
});

export { MotionConfigContext };
