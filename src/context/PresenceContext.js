import { writable } from "svelte/store";
import { getDomContext } from "./DOMcontext";


/**
 * @public
 */
export const PresenceContext = (c)=> getDomContext("Presence",c)||writable(null);
