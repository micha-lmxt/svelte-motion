/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
import { motionValue } from '../index.js';

function createScrollMotionValues(startStopNotifier) {
    const hasListener = { x: false, y: false, xp: false, yp: false }
    let stop
    const jointNotifier = startStopNotifier ? (type) => ()=>{
        if (!hasListener.x && !hasListener.y && !hasListener.xp && !hasListener.yp) {
            stop = startStopNotifier();
        }
        hasListener[type] = true;
        return () => {
            hasListener[type] = false;
            if (!hasListener.x && !hasListener.y && !hasListener.xp && !hasListener.yp) {
                if (stop){
                    stop.then(v=>v())
                }
            }
        }


    } : ()=>() => { }

    const smvs = {
        scrollX: motionValue(0,jointNotifier("x")),
        scrollY: motionValue(0,jointNotifier("y")),
        scrollXProgress: motionValue(0,jointNotifier("xp")),
        scrollYProgress: motionValue(0,jointNotifier("yp")),
    };

    return smvs;
}
function setProgress(offset, maxOffset, value) {
    value.set(!offset || !maxOffset ? 0 : offset / maxOffset);
}
function createScrollUpdater(values, getOffsets) {
    var update = function () {
        var _a = getOffsets(), xOffset = _a.xOffset, yOffset = _a.yOffset, xMaxOffset = _a.xMaxOffset, yMaxOffset = _a.yMaxOffset;
        // Set absolute positions
        values.scrollX.set(xOffset);
        values.scrollY.set(yOffset);
        // Set 0-1 progress
        setProgress(xOffset, xMaxOffset, values.scrollXProgress);
        setProgress(yOffset, yMaxOffset, values.scrollYProgress);
    };
    update();
    return update;
}

export { createScrollMotionValues, createScrollUpdater };
