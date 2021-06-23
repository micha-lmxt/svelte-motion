<script>
    import { afterUpdate, onMount } from "svelte";
    export let ___tag = "div";
    export let motion;

    const remove = () => {
        const parent = child.parentNode;
        if (!parent) return;
        const children = child.children;
        const le = children.length;
        for (let i = 0; i < le; i++) {
            container.appendChild(children[0]);
        }
        parent.removeChild(child);
        parent.appendChild(container);
    };

    const append = () => {
        const parent = container.parentNode;
        if (!parent) return;
        childrenTo();
        parent.insertBefore(child, container);
        parent.removeChild(container);
    };
    const childrenTo = () => {
        // count the dummies, maybe some children were removed
        const dummys = Array.from(container.childNodes).filter(
            (v) => v.tagName === "SVMDUMMY"
        );
        const overhead = dummys.length - child.childNodes.length;
        if (overhead > 0) {
            //remove all overhead dummies starting from top
            for (let i = 0; i < overhead; i++) {
                container.removeChild(dummys[i]);
            }
        }
        // get a list of children
        const children = container.childNodes;
        // only use innerHTML if there are no 'real' children
        if (children.length === 0 && child.childNodes.length === 0) {
            child.innerHTML = container.innerHTML;
        } else {
            const le = children.length;

            for (let i = 0; i < le; i++) {
                if (children[i].tagName === "SVMDUMMY") {
                    continue;
                }
                const ch = children[i];
                container.insertBefore(document.createElement("svmdummy"), ch);
                child.insertBefore(ch, child.childNodes[i]);
            }
        }
    };
    let container;
    let child;
    let mounted = false;

    onMount(() => {
        if (___tag === "div") {
            motion(container);
            return;
        }
        child = document.createElement(___tag);
        Object.keys($$restProps).forEach((v) => {
            child.setAttribute(v, $$restProps[v]);
        });
        append();
        motion(child);
        mounted = true;
        return remove;
    });
    if (___tag !== "div") {
        afterUpdate(() => {
            childrenTo();
        });
    }
    $: if (child) {
        Object.keys($$restProps).forEach((v) => {
            child.setAttribute(v, $$restProps[v]);
        });
    }
</script>

<div bind:this={container} {...$$restProps}>
    <slot />
</div>
