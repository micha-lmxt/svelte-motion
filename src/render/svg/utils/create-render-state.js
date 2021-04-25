/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { __assign } from 'tslib';
import { createHtmlRenderState } from '../../html/utils/create-render-state.js';

var createSvgRenderState = function () { return (__assign(__assign({}, createHtmlRenderState()), { attrs: {} })); };

export { createSvgRenderState };
