/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { PresenceContext } from '../../context/PresenceContext.js';
import { derived, get, readable } from 'svelte/store';
import { incrementId } from './UsePresence.svelte';
import { getContext, onMount} from "svelte";


function isPresent(context) {
    return context === null ? true : context.isPresent
}
export const useIsPresent = () => {
    let presenceContext = getContext(PresenceContext) || PresenceContext();
    return derived(presenceContext, $v => $v === null ? true : $v.isPresent)
}

export const usePresence = () => {

    const context = getContext(PresenceContext)||PresenceContext();
    const id = get(context) === null ? undefined : incrementId();
    onMount(()=>{
        if (get(context)!==null){
            get(context).register(id);
        }
    })

    if (get(context) === null){
        return readable([true,null]);
    }
    return derived(context,$v=>
        (!$v.isPresent && $v.onExitComplete) ? 
            [false, ()=>$v.onExitComplete?.(id)] :
            [true]
    )
}

export { default as UseIsPresent } from './UseIsPresent.svelte';
export { default as UsePresence } from './UsePresence.svelte';
export { isPresent };
