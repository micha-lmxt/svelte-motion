/** 
based on framer-motion@4.1.15,
Copyright (c) 2018 Framer B.V.
*/
import sync from 'framesync';

var unresolvedJobs = new Set();
var layoutState = {
    isMeasuringLayout: false,
};
function pushJob(stack, job, pointer) {
    if (!stack[pointer])
        stack[pointer] = [];
    stack[pointer].push(job);
}
function batchLayout(callback) {
    unresolvedJobs.add(callback);
    return function () { return unresolvedJobs.delete(callback); };
}
function flushLayout() {
    if (!unresolvedJobs.size)
        return;
    var pointer = 0;
    var reads = [[]];
    var writes = [];
    var setRead = function (job) { return pushJob(reads, job, pointer); };
    var setWrite = function (job) {
        pushJob(writes, job, pointer);
        pointer++;
    };
    /**
     * Resolve jobs into their array stacks
     */
    unresolvedJobs.forEach(function (callback) {
        callback(setRead, setWrite);
        pointer = 0;
    });
    unresolvedJobs.clear();
    /**
     * Mark that we're currently measuring layouts. This allows us to, for instance, ignore
     * hover events that might be triggered as a result of resetting transforms.
     *
     * The postRender/setTimeout combo seems like an odd bit of scheduling but what it's saying
     * is *after* the next render, wait 10ms before re-enabling hover events. Waiting until the
     * next frame completely will result in missed, valid hover events. But events seem to
     * be fired async from their actual action, so setting this to false too soon can still
     * trigger events from layout measurements.
     *
     * Note: If we figure out a way of measuring layout while transforms remain applied, this can be removed.
     * I have attempted unregistering event listeners and setting CSS to pointer-events: none
     * but neither seem to work as expected.
     */
    layoutState.isMeasuringLayout = true;
    sync.postRender(function () {
        setTimeout(function () { return (layoutState.isMeasuringLayout = false); }, 10);
    });
    /**
     * Execute jobs
     */
    var numStacks = writes.length;
    for (var i = 0; i <= numStacks; i++) {
        reads[i] && reads[i].forEach(executeJob);
        writes[i] && writes[i].forEach(executeJob);
    }
}
var executeJob = function (job) { return job(); };

export { batchLayout, flushLayout, layoutState };
