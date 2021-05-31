/** 
based on framer-motion@4.1.16,
Copyright (c) 2018 Framer B.V.
*/
import {
    createScrollMotionValues,
    createScrollUpdater,
} from "./utils"
import { addDomEvent } from "../../events/use-dom-event"
import { onDestroy, tick } from "svelte"

const getElementScrollOffsets = (element) => () => {
    return {
        xOffset: element.scrollLeft,
        yOffset: element.scrollTop,
        xMaxOffset: element.scrollWidth - element.offsetWidth,
        yMaxOffset: element.scrollHeight - element.offsetHeight,
    }
}

export const useElementScroll = (ref) => {
    
    const values = createScrollMotionValues();
    let cleanup;
    const setScroll = ()=>{
        cleanup?.();

        if ( (!ref || !ref.current) && !values.ref ){
            return;
        }
        const element = (ref && ref.current) ? ref : values.ref;

        const updateScrollValues = createScrollUpdater(
            values,
            getElementScrollOffsets(element)
        )

        const scrollListener = addDomEvent(
            element,
            "scroll",
            updateScrollValues,
            { passive: true }
        )

        const resizeListener = addDomEvent(
            element,
            "resize",
            updateScrollValues
        )
        cleanup = ()=>{
            scrollListener && scrollListener()
            resizeListener && resizeListener()
        }
    }


    if (ref && ref.current){
        setScroll()
    }else{
        tick().then(setScroll)
    }

    onDestroy(()=>cleanup?.())
    
    return values;
}

//export { default as UseElementScroll } from './UseElementScroll.svelte';
