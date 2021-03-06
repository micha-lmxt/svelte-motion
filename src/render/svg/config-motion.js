/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { renderSVG } from './utils/render.js';
import { scrapeMotionValuesFromProps } from './utils/scrape-motion-values.js';
import { createSvgRenderState } from './utils/create-render-state.js';
import { buildSVGAttrs } from './utils/build-attrs.js';

var svgMotionConfig = {
        scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
        createRenderState: createSvgRenderState,
        onMount: function (props, instance, _a) {
            var renderState = _a.renderState, latestValues = _a.latestValues;
            try {
                renderState.dimensions =
                    typeof instance.getBBox ===
                        "function"
                        ? instance.getBBox()
                        : instance.getBoundingClientRect();
            }
            catch (e) {
                // Most likely trying to measure an unrendered element under Firefox
                renderState.dimensions = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                };
            }
            if (isPath(instance)) {
                renderState.totalPathLength = instance.getTotalLength();
            }
            buildSVGAttrs(renderState, latestValues, undefined, undefined, { enableHardwareAcceleration: false }, props.transformTemplate);
            // TODO: Replace with direct assignment
            renderSVG(instance, renderState);
        },
    }
function isPath(element) {
    return element.tagName === "path";
}

export { svgMotionConfig };
