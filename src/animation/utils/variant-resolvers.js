
const labelsToArray = (label) => {
    if (!label) {
        return []
    }
    if (Array.isArray(label)) {
        return label
    }
    return [label]
}

export const resolveVariantLabels = (
    variant
) => {
    const unresolvedVariant =
        variant instanceof MotionValue ? (variant.get() ) : variant

    return Array.from(new Set(labelsToArray(unresolvedVariant)))
}

/**
 * Hooks in React sometimes accept a dependency array as their final argument. (ie useEffect/useMemo)
 * When values in this array change, React re-runs the dependency. However if the array
 * contains a variable number of items, React throws an error.
 */
export const asDependencyList = (list) => [
    list.join(","),
]
