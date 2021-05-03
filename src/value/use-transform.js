import { transform } from "../utils/transform"
import { useCombineMotionValues } from "./use-combine-values"

export const useTransform = (
    input,
    inputRangeOrTransformer,
    outputRange,
    options
)=>{
    let latest=[];
    const update = (
        input,
        inputRangeOrTransformer,
        outputRange,
        options,
        latest,
        combined
        )=>{
        const transformer = typeof inputRangeOrTransformer === "function"
        ? inputRangeOrTransformer
        : transform(inputRangeOrTransformer, outputRange, options);
        const values =  Array.isArray(input) ? input : [input];
        const _transformer = Array.isArray(input) ? transformer : 
        ([latest]) =>
              transformer(latest);

        let cmb = combined;
        if (!cmb){
            cmb = useCombineMotionValues(values, ()=>{
                latest.length = 0
                const numValues = values.length
                for (let i = 0; i < numValues; i++) {
                    latest[i] = values[i].get()
                }
        
                return _transformer(latest)
            })

            cmb.updateInner = cmb.update;
        } else {
            cmb.updateInner(values, ()=>{
                latest.length = 0
                const numValues = values.length
                for (let i = 0; i < numValues; i++) {
                    latest[i] = values[i].get()
                }
        
                return _transformer(latest)
            })
        }
        return cmb;
    }
    const comb = update( input,
        inputRangeOrTransformer,
        outputRange,
        options,
        latest)
    comb.update = (input,
        inputRangeOrTransformer,
        outputRange,
        options) => update(input,
        inputRangeOrTransformer,
        outputRange,
        options,
        latest,
        comb)
    return comb;
}
export { default as UseTransform } from './UseTransform.svelte';
