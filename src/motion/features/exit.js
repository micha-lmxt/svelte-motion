import ExitComponent from './Exit.svelte';
import { checkShouldInheritVariant } from '../utils/should-inherit-variant.js';

/**
 * @public
 */
var Exit = {
    key: "exit",
    shouldRender: function (props) { return !!props.exit && !checkShouldInheritVariant(props); },
    getComponent: function () { return ExitComponent; },
};

export { Exit };
