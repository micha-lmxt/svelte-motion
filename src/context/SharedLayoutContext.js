/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

import { writable } from 'svelte/store';
import { createBatcher } from '../components/AnimateSharedLayout/utils/batcher.js';
import { getDomContext } from './DOMcontext.js';

var SharedLayoutContext = (custom) => getDomContext("SharedLayout",custom)||writable(createBatcher());
/**
 * @internal
 */
var FramerTreeLayoutContext = ()=> writable(createBatcher());

function isSharedLayout(context) {
    return !!context.forceUpdate;
}

export { FramerTreeLayoutContext, SharedLayoutContext, isSharedLayout };
