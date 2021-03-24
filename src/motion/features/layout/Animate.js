import AnimateLayoutContextProvider from './AnimateLayoutContextProvider.svelte';

export const AnimateLayout = {
    key: "animate-layout",
    shouldRender: (props) =>
    !!props.layout || props.layoutId !== undefined,
getComponent: () => AnimateLayoutContextProvider,
}