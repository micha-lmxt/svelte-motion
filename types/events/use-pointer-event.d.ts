/** 
based on framer-motion@4.1.17,
Copyright (c) 2018 Framer B.V.
*/
import { RefObject } from "react";
import { EventListenerWithPointInfo } from "./event-info";
export declare function addPointerEvent(target: EventTarget, eventName: string, handler: EventListenerWithPointInfo, options?: AddEventListenerOptions): () => void;
export declare function usePointerEvent(ref: RefObject<Element>, eventName: string, handler?: EventListenerWithPointInfo | undefined, options?: AddEventListenerOptions): void;
