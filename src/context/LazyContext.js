import { writable } from "svelte/store";


const LazyContext = () => writable({ strict: false });

export { LazyContext };
