/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { MotionValue } from "../value";
import { TransformOptions } from "../utils/transform";
export declare type InputRange = number[];
declare type SingleTransformer<I, O> = (input: I) => O;
declare type MultiTransformer<I, O> = (input: I[]) => O;
/**
 * Create a `MotionValue` that transforms the output of another `MotionValue` by mapping it from one range of values into another.
 *
 * @remarks
 *
 * Given an input range of `[-200, -100, 100, 200]` and an output range of
 * `[0, 1, 1, 0]`, the returned `MotionValue` will:
 *
 * - When provided a value between `-200` and `-100`, will return a value between `0` and  `1`.
 * - When provided a value between `-100` and `100`, will return `1`.
 * - When provided a value between `100` and `200`, will return a value between `1` and  `0`
 *
 *
 * The input range must be a linear series of numbers. The output range
 * can be any value type supported by Framer Motion: numbers, colors, shadows, etc.
 *
 * Every value in the output range must be of the same type and in the same format.
 *
  * @motion
 *
 * ```jsx
 * <script>
 *   const x = useMotionValue(0)
 *   const xRange = [-200, -100, 100, 200]
 *   const opacityRange = [0, 1, 1, 0]
 *   const opacity = useTransform(x, xRange, opacityRange)
 * </script>
 * 
 * <Motion let:motion 
 *      animate={{ x: 200 }}
 *      style={{ opacity, x }}
 *  >
 *     <div use:motion/>
 *  </Motion>
 * ```
 *
 * @param inputValue - `MotionValue`
 * @param inputRange - A linear series of numbers (either all increasing or decreasing)
 * @param outputRange - A series of numbers, colors or strings. Must be the same length as `inputRange`.
 * @param options -
 *
 *  - clamp: boolean. Clamp values to within the given range. Defaults to `true`
 *  - ease: EasingFunction[]. Easing functions to use on the interpolations between each value in the input and output ranges. If provided as an array, the array must be one item shorter than the input and output ranges, as the easings apply to the transition between each.
 *
 * @returns `MotionValue & { reset: (value: MotionValue<number>, inputRange: InputRange, outputRange: O[], options?: TransformOptions<O>) => void }`
 *
 * @public
 */
export declare function useTransform<I, O>(value: MotionValue<number>, inputRange: InputRange, outputRange: O[], options?: TransformOptions<O>): 
    MotionValue<O> & { reset: (value: MotionValue<number>, inputRange: InputRange, outputRange: O[], options?: TransformOptions<O>) => void };
/**
 * Create a `MotionValue` that transforms the output of another `MotionValue` through a function.
 * In this example, `y` will always be double `x`.
 *
 * @motion
 *
 * ```jsx
 * <script>
 *   const x = useMotionValue(10)
 *   const y = useTransform(x, value => value * 2)
 * </script>
 * 
 * <Motion let:motion style={{ x, y }}>
 *   <div use:motion/>
 * </Motion>
 * ```
 *
 * @param input - A `MotionValue` that will pass its latest value through `transform` to update the returned `MotionValue`.
 * @param transform - A function that accepts the latest value from `input` and returns a new value.
 * @returns `MotionValue`
 *
 * @public
 */
export declare function useTransform<I, O>(input: MotionValue<I>, transformer: SingleTransformer<I, O>): 
    MotionValue<O> & { reset: (input: MotionValue<I>, transformer: SingleTransformer<I, O>) => void};
/**
 * Pass an array of `MotionValue`s and a function to combine them. In this example, `z` will be the `x` multiplied by `y`.
 *
 * @motion
 *
 * ```jsx
 * <script>
 *   const x = useMotionValue(0)
 *   const y = useMotionValue(0)
 *   const z = useTransform([x, y], [latestX, latestY] => latestX * latestY)
 * </script>
 * 
 * <Motion let:motion style={{ x, y, z }}>
 *   return <div use:motion/>
 * </Motion>
 * ```
 *
 * @param input - An array of `MotionValue`s that will pass their latest values through `transform` to update the returned `MotionValue`.
 * @param transform - A function that accepts the latest values from `input` and returns a new value.
 * @returns `MotionValue`
 *
 * @public
 */
export declare function useTransform<I, O>(input: MotionValue<string | number>[], transformer: MultiTransformer<I, O>):
    MotionValue<O> & { reset: (input: MotionValue<string | number>[], transformer: MultiTransformer<I, O>) => void };
export {};
