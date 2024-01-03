/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { SvelteComponent } from "svelte";
import { VisualElement } from "..";
export declare function addDomEvent(target: EventTarget, eventName: string, handler: EventListener, options?: AddEventListenerOptions): () => void;
export declare interface UseDomEventProps {
    /**
     * Ref object that's been provided to the element you want to bind the listener to.
     */
    ref: {current:Node} | VisualElement<EventTarget>,
    /**
     * Name of the event you want listen for.
     */
    eventName: string,
    /**
     * Function to fire when receiving the event.
     */
    handler?: EventListener,
    /**
     * Options to pass to `Event.addEventListener`.
     */
    options?: AddEventListenerOptions
}
/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing Sveltes's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * <script>
 *  import { useDomEvent } from 'svelte-motion'
 *  let ref;
 * </script>
 *
 * <UseDomEvent ref={{current:ref}} eventName="wheel" handler={onWheel} options={{passive: false}/>
 * <div bind:this={ref}/>
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */
export declare class UseDomEvent extends SvelteComponent<UseDomEventProps,{},{default:{}}>{}
    
