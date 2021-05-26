import { transform } from "../utils/transform"
import { useCombineMotionValues } from "./use-combine-values"

export const useTransform = (
    input,
    inputRangeOrTransformer,
    outputRange,
    options
) => {

    let latest = [];

    const update = (
        input,
        inputRangeOrTransformer,
        outputRange,
        options
    ) => {
        const transformer = typeof inputRangeOrTransformer === "function"
            ? inputRangeOrTransformer
            : transform(inputRangeOrTransformer, outputRange, options);
        const values = Array.isArray(input) ? input : [input];
        const _transformer = Array.isArray(input) ? transformer :
            ([latest]) =>
                transformer(latest);
        return [values, () => {
            latest.length = 0
            const numValues = values.length
            for (let i = 0; i < numValues; i++) {
                latest[i] = values[i].get()
            }

            return _transformer(latest)
        }]

    }
    const comb = useCombineMotionValues(...update(input,
        inputRangeOrTransformer,
        outputRange,
        options));

    comb.updateInner = comb.reset;

    comb.reset = (
        input,
        inputRangeOrTransformer,
        outputRange,
        options
    ) => comb.updateInner(
        ...update(
            input,
            inputRangeOrTransformer,
            outputRange,
            options
        )
    )
    return comb;
}
//export { default as UseTransform } from './UseTransform.svelte';
