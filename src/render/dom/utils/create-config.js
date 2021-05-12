/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { __assign } from 'tslib';
import { isSVGComponent } from './is-svg-component.js';
import { createUseRender } from '../use-render.js';
import { svgMotionConfig } from '../../svg/config-motion.js';
import { htmlMotionConfig } from '../../html/config-motion.js';

function createDomMotionConfig(Component, _a, preloadedFeatures, createVisualElement) {
    var _b = _a.forwardMotionProps, forwardMotionProps = _b === void 0 ? false : _b;
    var baseConfig = isSVGComponent(Component)
        ? svgMotionConfig
        : htmlMotionConfig;
    return __assign(__assign({}, baseConfig), { preloadedFeatures: preloadedFeatures, useRender: createUseRender(forwardMotionProps), createVisualElement: createVisualElement,
        Component: Component });
}

export { createDomMotionConfig };
