import { writable } from "svelte/store";
import { getDomContext } from "./DOMcontext";


const LazyContext = (c) => getDomContext("Lazy",c) || writable({ strict: false });

export { LazyContext };
