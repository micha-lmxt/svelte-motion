import GestureComponent from './Gestures.svelte';
/**
 * @public
 */
var Gestures = {
    key: "gestures",
    shouldRender: function (props) {
        return gestureProps.some(function (key) { return props.hasOwnProperty(key); });
    },
    getComponent: function () { return GestureComponent; },
};

export { Gestures };
