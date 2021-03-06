/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
/**
 * Convert camelCase to dash-case properties.
 */
var camelToDash = function (str) {
    return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};

export { camelToDash };
