/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { MotionValue } from "..";
import { CustomValueType } from "../../types";
/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 *
 * @internal
 */
export declare function resolveMotionValue(value?: string | number | CustomValueType | MotionValue): string | number;
