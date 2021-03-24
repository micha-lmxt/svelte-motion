import { __rest } from 'tslib';
import { axisBox, delta } from '../../utils/geometry/index.js';
import { isMotionValue } from '../../value/utils/is-motion-value.js';
import { checkIfControllingVariants, resolveVariantFromProps } from './variants.js';
import { isAnimationControls } from '../../animation/animation-controls.js';
import { isForcedMotionValue } from '../../motion/utils/is-forced-motion-value.js';

var createProjectionState = function () { return ({
    isEnabled: false,
    isTargetLocked: false,
    target: axisBox(),
    targetFinal: axisBox(),
}); };
function createVisualState(props, parent, blockInitialAnimation) {
    var style = props.style;
    var values = {};
    for (var key in style) {
        if (isMotionValue(style[key])) {
            values[key] = style[key].get();
        }
        else if (isForcedMotionValue(key, props)) {
            values[key] = style[key];
        }
    }
    var initial = props.initial, animate = props.animate;
    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = isControllingVariants || props.variants;
    if (isVariantNode && !isControllingVariants && props.inherit !== false) {
        var context = parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
        if (context) {
            initial !== null && initial !== void 0 ? initial : (initial = context.initial);
            animate !== null && animate !== void 0 ? animate : (animate = context.animate);
        }
    }
    var initialToSet = blockInitialAnimation || initial === false ? animate : initial;
    if (initialToSet &&
        typeof initialToSet !== "boolean" &&
        !isAnimationControls(initialToSet)) {
        var list = Array.isArray(initialToSet) ? initialToSet : [initialToSet];
        list.forEach(function (definition) {
            var resolved = resolveVariantFromProps(props, definition);
            if (!resolved)
                return;
            var transitionEnd = resolved.transitionEnd, transition = resolved.transition, target = __rest(resolved, ["transitionEnd", "transition"]);
            for (var key in target)
                values[key] = target[key];
            for (var key in transitionEnd)
                values[key] = transitionEnd[key];
        });
    }
    return values;
}
function createLayoutState() {
    return {
        isHydrated: false,
        layout: axisBox(),
        layoutCorrected: axisBox(),
        treeScale: { x: 1, y: 1 },
        delta: delta(),
        deltaFinal: delta(),
        deltaTransform: "",
    };
}
var zeroLayout = createLayoutState();

export { createLayoutState, createProjectionState, createVisualState, zeroLayout };
