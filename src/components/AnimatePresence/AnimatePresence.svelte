<script>
    /** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

    import { getContext } from "svelte";
    import {
        SharedLayoutContext,
        isSharedLayout,
    } from "../../context/SharedLayoutContext.js";
    import PresenceChild from "./PresenceChild.svelte";

    export let list = undefined,
        custom = undefined,
        initial = true,
        onExitComplete = undefined,
        exitBeforeEnter = undefined,
        presenceAffectsLayout = true,
        show = undefined,
        isCustom=false;

    let _list = list !== undefined ? list : show ? [{ key: 1 }] : [];
    $: _list = list !== undefined ? list : show ? [{ key: 1 }] : [];

    const layoutContext =
        getContext(SharedLayoutContext) || SharedLayoutContext(isCustom);

    $: (isl = isSharedLayout($layoutContext));

    $: forceRender = () => {
        if (isl) {
            $layoutContext.forceUpdate();
        }
        _list = [..._list];
    };

    function getChildKey(child) {
        return child.key || "";
    }

    let isInitialRender = true;
    let filteredChildren = _list;
    $: filteredChildren = _list;

    let presentChildren = filteredChildren;
    let allChildren = new Map();
    let exiting = new Set();
    const updateChildLookup = (children, allChild) => {
        children.forEach((child) => {
            const key = getChildKey(child);
            allChild.set(key, child);
        });
    };
    $: updateChildLookup(filteredChildren, allChildren);

    let childrenToRender = [
        ...filteredChildren.map((v) => ({
            present: true,
            item: v,
            key: v.key,
        })),
    ];

    $: if (!isInitialRender) {
        // If this is a subsequent render, deal with entering and exiting children
        childrenToRender = [
            ...filteredChildren.map((v) => ({
                present: true,
                item: v,
                key: v.key,
            })),
        ];

        // Diff the keys of the currently-present and target children to update our
        // exiting list.
        const presentKeys = presentChildren.map(getChildKey);
        const targetKeys = filteredChildren.map(getChildKey);
        // Diff the present children with our target children and mark those that are exiting
        const numPresent = presentKeys.length;
        for (let i = 0; i < numPresent; i++) {
            const key = presentKeys[i];
            if (targetKeys.indexOf(key) === -1) {
                exiting.add(key);
            } else {
                // In case this key has re-entered, remove from the exiting list
                exiting.delete(key);
            }
        }

        // If we currently have exiting children, and we're deferring rendering incoming children
        // until after all current children have exiting, empty the childrenToRender array
        if (exitBeforeEnter && exiting.size) {
            childrenToRender = [];
        }
        // Loop through all currently exiting components and clone them to overwrite `animate`
        // with any `exit` prop they might have defined.
        exiting.forEach((key) => {
            // If this component is actually entering again, early return
            if (targetKeys.indexOf(key) !== -1) return;

            const child = allChildren.get(key);
            if (!child) return;

            const insertionIndex = presentKeys.indexOf(key);

            const onExit = () => {
                allChildren.delete(key);
                exiting.delete(key);

                // Remove this child from the present children
                const removeIndex = presentChildren.findIndex(
                    (presentChild) => presentChild.key === key
                );

                if (removeIndex < 0) {
                    return;
                }
                presentChildren.splice(removeIndex, 1);

                // Defer re-rendering until all exiting children have indeed left
                if (!exiting.size) {
                    presentChildren = [...filteredChildren];
                    forceRender();
                    onExitComplete && onExitComplete();
                }
            };

            childrenToRender.splice(insertionIndex, 0, {
                present: false,
                item: child,
                key: getChildKey(child),
                onExit,
            });
        });
        // Add `MotionContext` even to children that don't need it to ensure we're rendering
        // the same tree between renders

        /*
        childrenToRender = childrenToRender.map((child) => {
            const key = child.key as string | number;
            return exiting.has(key) ? (
                child
            ) : (
                <PresenceChild
                    key={getChildKey(child)}
                    isPresent
                    presenceAffectsLayout={presenceAffectsLayout}
                >
                    {child}
                </PresenceChild>
            );
        });
        */
        presentChildren = childrenToRender;
    } else {
        isInitialRender = false;
    }
</script>

{#each childrenToRender as child (getChildKey(child))
}<PresenceChild
        isPresent={child.present}
        initial={initial ? undefined : false}
        custom={child.onExit ? custom : undefined}
        {presenceAffectsLayout}
        onExitComplete={child.onExit}
        {isCustom}
    ><slot item={child.item} 
    /></PresenceChild
    >{/each}
