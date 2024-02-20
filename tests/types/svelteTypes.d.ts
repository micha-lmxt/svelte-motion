// The following is necessary because there are two clashing errors that can't be solved at the same time
// when using Svelte2TsxComponent, more precisely the event typings in
// __sveltets_2_ensureComponent<T extends new (..) => _SvelteComponent<any,||any||<-this,any>>(type: T): T;
// If we type it as "any", we have an error when using sth like {a: CustomEvent<any>}
// If we type it as "{}", we have an error when using sth like {[evt: string]: CustomEvent<any>}
// If we type it as "unknown", we get all kinds of follow up errors which we want to avoid
// Therefore introduce two more base classes just for this case.
/**
 * Ambient type only used for intellisense, DO NOT USE IN YOUR PROJECT
 */
declare type ATypedSvelteComponent = {
    /**
     * @internal This is for type checking capabilities only
     * and does not exist at runtime. Don't use this property.
     */
    $$prop_def: any;
    /**
     * @internal This is for type checking capabilities only
     * and does not exist at runtime. Don't use this property.
     */
    $$events_def: any;
    /**
     * @internal This is for type checking capabilities only
     * and does not exist at runtime. Don't use this property.
     */
    $$slot_def: any;

    $on(event: string, handler: ((e: any) => any) | null | undefined): () => void;
}
/**
 * Ambient type only used for intellisense, DO NOT USE IN YOUR PROJECT.
 * 
 * If you're looking for the type of a Svelte Component, use `SvelteComponent` and `ComponentType` instead:
 *
 * ```ts
 * import type { ComponentType, SvelteComponent } from "svelte";
 * let myComponentConstructor: ComponentType<SvelteComponent> = ..;
 * ```
 */
export declare type ConstructorOfATypedSvelteComponent = new (args: {target: any, props?: any}) => ATypedSvelteComponent