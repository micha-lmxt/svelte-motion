/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
/**
 * @public
 */
export interface AnimatePresenceProps<T extends {key:any}> {
    /**
     * By passing `initial={false}`, `AnimatePresence` will disable any initial animations on children
     * that are present when the component is first rendered.
     *
     * @motion
     *
     * ```jsx
     * <AnimatePresence initial={false} show={isVisible}>
     *     <MotionDiv
     *       key="modal"
     *       initial={{ opacity: 0 }}
     *       animate={{ opacity: 1 }}
     *       exit={{ opacity: 0 }}
     *     />
     * </AnimatePresence>
     * ```
     *
     * @public
     */
    initial?: boolean;
    /**
     * When a component is removed, there's no longer a chance to update its props. So if a component's `exit`
     * prop is defined as a dynamic variant and you want to pass a new `custom` prop, you can do so via `AnimatePresence`.
     * This will ensure all leaving components animate using the latest data.
     *
     * @public
     */
    custom?: any;
    /**
     * Fires when all exiting nodes have completed animating out.
     *
     * @public
     */
    onExitComplete?: () => void;
    /**
     * If set to `true`, `AnimatePresence` will only render one component at a time. The exiting component
     * will finished its exit animation before the entering component is rendered.
     *
     * @motion
     *
     * ```jsx
     * const MyComponent = ({ currentItem }) => (
     *   <AnimatePresence exitBeforeEnter>
     *     <MotionDiv key={currentItem} exit={{ opacity: 0 }} />
     *   </AnimatePresence>
     * )
     * ```
     *
     * @beta
     */
    exitBeforeEnter?: boolean;
    /**
     * Used in Framer to flag that sibling children *shouldn't* re-render as a result of a
     * child being removed.
     *
     * @internal
     */
    presenceAffectsLayout?: boolean;
    /**
     * The data array for the items you want to render. Every Item needs a unique `key`.
     * 
     * Alternatively, you can leave this undefined and supply `show` prop.
     */
    list?:T[]
    /**
     * Render the child when this is set to `true`, exit it when changed to `false`.
     * 
     * Only used when list is undefined.
     */
    show?: boolean
}
