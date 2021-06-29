import { writable } from "svelte/store";
import { getDomContext } from "./DOMcontext";

/**
 * @internal
 */
export const LayoutGroupContext = (c)=>getDomContext("LayoutGroup",c)||writable(null);
