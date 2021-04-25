/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

import { mix } from 'popmotion';

function tweenAxis(target, prev, next, p) {
    target.min = mix(prev.min, next.min, p);
    target.max = mix(prev.max, next.max, p);
}

export { tweenAxis };
