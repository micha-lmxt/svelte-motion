function isPresent(context) {
    return context === null ? true : context.isPresent
}

export {default as UseIsPresent} from './UseIsPresent.svelte';
export {default as UsePresence} from './UsePresence.svelte';
export { isPresent};
