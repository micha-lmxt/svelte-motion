/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { EventInfo } from "../events/types";
import { VariantLabels } from "../motion/types";
import { TargetAndTransition } from "../types";
import { Point2D } from "../types/geometry";
import { PanInfo } from "./PanSession";
export declare type RemoveEvent = () => void;
/**
 * @public
 */
export interface FocusHandlers {
    /**
     * Properties or variant label to animate to while the focus gesture is recognised.
     *
     * @motion
     *
     * ```jsx
     * <motion.input whileFocus={{ scale: 1.2 }} />
     * ```
     */
    whileFocus?: VariantLabels | TargetAndTransition;
}
/**
 * Passed in to tap event handlers like `onTap` the `TapInfo` object contains
 * information about the tap gesture such as it‘s location.
 *
 * @motion
 *
 * ```jsx
 * function onTap(event, info) {
 *   console.log(info.point.x, info.point.y)
 * }
 *
 * <MotionDiv onTap={onTap} />
 * ```
 *
 * @public
 */
export interface TapInfo {
    /**
     * Contains `x` and `y` values for the tap gesture relative to the
     * device or page.
     *
     * @motion
     *
     * ```jsx
     * function onTapStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <MotionDiv onTapStart={onTapStart} />
     * ```
     *
     * @public
     */
    point: Point2D;
}
/**
 * @public
 */
export interface TapHandlers {
    /**
     * Callback when the tap gesture successfully ends on this element.
     *
     * @motion
     *
     * ```jsx
     * function onTap(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <MotionDiv onTap={onTap} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link TapInfo} object containing `x` and `y` values for the `point` relative to the device or page.
     */
    onTap?(event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo): void;
    /**
     * Callback when the tap gesture starts on this element.
     *
     * @motion
     *
     * ```jsx
     * function onTapStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <MotionDiv onTapStart={onTapStart} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link TapInfo} object containing `x` and `y` values for the `point` relative to the device or page.
     */
    onTapStart?(event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo): void;
    /**
     * Callback when the tap gesture ends outside this element.
     *
     * @motion
     *
     * ```jsx
     * function onTapCancel(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <MotionDiv onTapCancel={onTapCancel} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link TapInfo} object containing `x` and `y` values for the `point` relative to the device or page.
     */
    onTapCancel?(event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo): void;
    /**
     * Properties or variant label to animate to while the component is pressed.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv whileTap={{ scale: 0.8 }} />
     * ```
     */
    whileTap?: VariantLabels | TargetAndTransition;
}
export declare type PanHandler = (event: Event, info: PanInfo) => void;
/**
 * @public
 */
export interface PanHandlers {
    /**
     * Callback function that fires when the pan gesture is recognised on this element.
     *
     * **Note:** For pan gestures to work correctly with touch input, the element needs
     * touch scrolling to be disabled on either x/y or both axis with the
     * [touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) CSS rule.
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <MotionDiv onPan={onPan} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - A {@link PanInfo} object containing `x` and `y` values for:
     *
     *   - `point`: Relative to the device or page.
     *   - `delta`: Distance moved since the last event.
     *   - `offset`: Offset from the original pan event.
     *   - `velocity`: Current velocity of the pointer.
     */
    onPan?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when the pan gesture begins on this element.
     *
     * @motion
     *
     * ```jsx
     * function onPanStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <MotionDiv onPanStart={onPanStart} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - A {@link PanInfo} object containing `x`/`y` values for:
     *
     *   - `point`: Relative to the device or page.
     *   - `delta`: Distance moved since the last event.
     *   - `offset`: Offset from the original pan event.
     *   - `velocity`: Current velocity of the pointer.
     */
    onPanStart?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when we begin detecting a pan gesture. This
     * is analogous to `onMouseStart` or `onTouchStart`.
     *
     * @motion
     *
     * ```jsx
     * function onPanSessionStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <MotionDiv onPanSessionStart={onPanSessionStart} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link EventInfo} object containing `x`/`y` values for:
     *
     *   - `point`: Relative to the device or page.
     */
    onPanSessionStart?(event: MouseEvent | TouchEvent | PointerEvent, info: EventInfo): void;
    /**
     * Callback function that fires when the pan gesture ends on this element.
     *
     * @motion
     *
     * ```jsx
     * function onPanEnd(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <MotionDiv onPanEnd={onPanEnd} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - A {@link PanInfo} object containing `x`/`y` values for:
     *
     *   - `point`: Relative to the device or page.
     *   - `delta`: Distance moved since the last event.
     *   - `offset`: Offset from the original pan event.
     *   - `velocity`: Current velocity of the pointer.
     */
    onPanEnd?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
}
/**
 * @public
 */
export interface HoverHandlers {
    /**
     * Properties or variant label to animate to while the hover gesture is recognised.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv whileHover={{ scale: 1.2 }} />
     * ```
     */
    whileHover?: VariantLabels | TargetAndTransition;
    /**
     * Callback function that fires when pointer starts hovering over the component.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv onHoverStart={() => console.log('Hover starts')} />
     * ```
     */
    onHoverStart?(event: MouseEvent, info: EventInfo): void;
    /**
     * Callback function that fires when pointer stops hovering over the component.
     *
     * @motion
     *
     * ```jsx
     * <MotionDiv onHoverEnd={() => console.log("Hover ends")} />
     * ```
     */
    onHoverEnd?(event: MouseEvent, info: EventInfo): void;
}
