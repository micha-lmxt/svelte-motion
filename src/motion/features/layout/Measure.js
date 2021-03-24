import MeasureContextProvider from './MeasureContextProvider.svelte';

var MeasureLayout = {
    key: "measure-layout",
    shouldRender: function (props) {
        return !!props.drag || !!props.layout || props.layoutId !== undefined;
    },
    getComponent: function () { return MeasureContextProvider; },
};

export { MeasureLayout };
