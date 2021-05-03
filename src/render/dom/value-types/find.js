/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import {fixed} from '../../../utils/fix-process-env';
import { __spreadArray, __read } from 'tslib';
import { color, complex } from 'style-value-types';
import { dimensionValueTypes } from './dimensions.js';
import { testValueType } from './test.js';

/**
 * A list of all ValueTypes
 */
var valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes)), [color, complex]);
/**
 * Tests a value against the list of ValueTypes
 */
var findValueType = function (v) { return valueTypes.find(testValueType(v)); };

export { findValueType };
