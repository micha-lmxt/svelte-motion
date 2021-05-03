/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import {fixed} from '../../../utils/fix-process-env';
import { __assign } from 'tslib';
import { color, filter } from 'style-value-types';
import { numberValueTypes } from './number.js';

/**
 * A map of default value types for common values
 */
var defaultValueTypes = __assign(__assign({}, numberValueTypes), { 
    // Color props
    color: color, backgroundColor: color, outlineColor: color, fill: color, stroke: color, 
    // Border props
    borderColor: color, borderTopColor: color, borderRightColor: color, borderBottomColor: color, borderLeftColor: color, filter: filter, WebkitFilter: filter });
/**
 * Gets the default ValueType for the provided value key
 */
var getDefaultValueType = function (key) { return defaultValueTypes[key]; };

export { defaultValueTypes, getDefaultValueType };
