import { __rest, __assign } from 'tslib';
import { isMotionValue } from '../../value/utils/is-motion-value.js';
import { isTransformProp } from './utils/transform.js';
import { getDefaultValueType } from './utils/value-types.js';
import { getOrigin, checkTargetForNewValues } from '../utils/setters.js';
import { isForcedMotionValue } from '../../motion/utils/is-forced-motion-value.js';
import { visualElement } from '../index.js';
import { getBoundingBox } from './projection/measure.js';
import { isCSSVariable } from './utils/is-css-variable.js';
import { buildHTMLStyles } from './utils/build-html-styles.js';
import { parseDomVariant } from './utils/parse-dom-variant.js';

function getComputedStyle(element) {
    return window.getComputedStyle(element);
}
var htmlConfig = {
    treeType: "dom",
    readValueFromInstance: function (domElement, key) {
        if (isTransformProp(key)) {
            var defaultType = getDefaultValueType(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        else {
            var computedStyle = getComputedStyle(domElement);
            return ((isCSSVariable(key)
                ? computedStyle.getPropertyValue(key)
                : computedStyle[key]) || 0);
        }
    },
    createRenderState: function () { return ({
        style: {},
        transform: {},
        transformKeys: [],
        transformOrigin: {},
        vars: {},
    }); },
    sortNodePosition: function (a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    },
    getBaseTarget: function (props, key) {
        var _a;
        return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
    },
    measureViewportBox: function (element, _a) {
        var transformPagePoint = _a.transformPagePoint;
        return getBoundingBox(element, transformPagePoint);
    },
    /**
     * Reset the transform on the current Element. This is called as part
     * of a batched process across the entire layout tree. To remove this write
     * cycle it'd be interesting to see if it's possible to "undo" all the current
     * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
     * works
     */
    resetTransform: function (element, domElement, props) {
        /**
         * When we reset the transform of an element, there's a fair possibility that
         * the element will visually move from underneath the pointer, triggering attached
         * pointerenter/leave events. We temporarily suspend these while measurement takes place.
         */
        element.suspendHoverEvents();
        var transformTemplate = props.transformTemplate;
        domElement.style.transform = transformTemplate
            ? transformTemplate({}, "")
            : "none";
        // Ensure that whatever happens next, we restore our transform on the next frame
        element.scheduleRender();
    },
    restoreTransform: function (instance, mutableState) {
        instance.style.transform = mutableState.style.transform;
    },
    removeValueFromMutableState: function (key, _a) {
        var vars = _a.vars, style = _a.style;
        delete vars[key];
        delete style[key];
    },
    /**
     * Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
     * can be animated by Motion.
     */
    makeTargetAnimatable: function (element, _a, _b, isMounted) {
        var transformValues = _b.transformValues;
        if (isMounted === void 0) { isMounted = true; }
        var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest(_a, ["transition", "transitionEnd"]);
        var origin = getOrigin(target, transition || {}, element);
        /**
         * If Framer has provided a function to convert `Color` etc value types, convert them
         */
        if (transformValues) {
            if (transitionEnd)
                transitionEnd = transformValues(transitionEnd);
            if (target)
                target = transformValues(target);
            if (origin)
                origin = transformValues(origin);
        }
        if (isMounted) {
            checkTargetForNewValues(element, target, origin);
            var parsed = parseDomVariant(element, target, origin, transitionEnd);
            transitionEnd = parsed.transitionEnd;
            target = parsed.target;
        }
        return __assign({ transition: transition,
            transitionEnd: transitionEnd }, target);
    },
    scrapeMotionValuesFromProps: function (props) {
        var style = props.style;
        var newValues = {};
        for (var key in style) {
            if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
                newValues[key] = style[key];
            }
        }
        return newValues;
    },
    build: function (element, renderState, latestValues, projection, layoutState, options, props) {
        if (element.isVisible !== undefined) {
            renderState.style.visibility = element.isVisible
                ? "visible"
                : "hidden";
        }
        buildHTMLStyles(renderState, latestValues, projection, layoutState, options, props.transformTemplate);
    },
    render: function (element, _a) {
        var style = _a.style, vars = _a.vars;
        // Directly assign style into the Element's style prop. In tests Object.assign is the
        // fastest way to assign styles.
        Object.assign(element.style, style);
        // Loop over any CSS variables and assign those.
        for (var key in vars) {
            element.style.setProperty(key, vars[key]);
        }
    },
};
var htmlVisualElement = visualElement(htmlConfig);

export { getComputedStyle, htmlConfig, htmlVisualElement };
