import { getContext } from "svelte";
import { get } from "svelte/store";
import {
    ScaleCorrectionContext,
    ScaleCorrectionParentContext,
} from "../../context/ScaleCorrectionProvider.svelte";


export const scaleCorrection = () => {

    const scaleCorrectionContext = getContext(ScaleCorrectionContext);
    const scaleCorrectionParentContext = getContext(
        ScaleCorrectionParentContext
    );
    const afterU = (nc = false) => {
        /* Second part of the updater calling in child layouts first.*/
        const scc = get(scaleCorrectionContext);

        
        scc.forEach((v, i) => {
            v.afterU?.(true);
        });
    };

    const updater = () => {
        // in React the updater function is called on children first, in Svelte the child does not call it.
        get(scaleCorrectionContext).forEach((v) => {
            v.updater?.(true);
        })
    }

    scaleCorrectionParentContext.update((v) =>
        v.concat([
            {
                updater,
                afterU,
            },
        ])
    );
    
    return {
        update: updater
        }
    }



