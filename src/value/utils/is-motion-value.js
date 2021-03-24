import { MotionValue } from '../index.js';

var isMotionValue = function (value) {
    return value instanceof MotionValue;
};

export { isMotionValue };
