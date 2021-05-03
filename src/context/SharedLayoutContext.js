/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

import { writable } from 'svelte/store';
import { createBatcher } from '../components/AnimateSharedLayout/utils/batcher.js';

var SharedLayoutContext = () => writable(createBatcher());
/**
 * @internal
 */
var FramerTreeLayoutContext = ()=> writable(createBatcher());

function isSharedLayout(context) {
    return !!context.forceUpdate;
}

export { FramerTreeLayoutContext, SharedLayoutContext, isSharedLayout };
