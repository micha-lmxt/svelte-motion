/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/

import { __assign } from 'tslib';
import { Presence } from '../types.js';
import { elementDragControls } from '../../../gestures/drag/VisualElementDragControls.js';
import { createCrossfader } from './crossfader.js';

function layoutStack() {
    var stack = new Set();
    var state = { leadIsExiting: false };
    var prevState = __assign({}, state);
    var prevValues;
    var prevViewportBox;
    var prevDragCursor;
    var crossfader = createCrossfader();
    var needsCrossfadeAnimation = false;
    function getFollowViewportBox() {
        return state.follow ? state.follow.prevViewportBox : prevViewportBox;
    }
    function getFollowLayout() {
        var _a;
        return (_a = state.follow) === null || _a === void 0 ? void 0 : _a.getLayoutState().layout;
    }
    return {
        add: function (element) {
            element.setCrossfader(crossfader);
            stack.add(element);
            /**
             * Hydrate new element with previous drag position if we have one
             */
            if (prevDragCursor)
                element.prevDragCursor = prevDragCursor;
            if (!state.lead)
                state.lead = element;
        },
        remove: function (element) {
            stack.delete(element);
        },
        getLead: function () { return state.lead; },
        updateSnapshot: function () {
            if (!state.lead)
                return;
            prevValues = crossfader.isActive()
                ? crossfader.getLatestValues()
                : state.lead.getLatestValues();
            prevViewportBox = state.lead.prevViewportBox;
            var dragControls = elementDragControls.get(state.lead);
            if (dragControls && dragControls.isDragging) {
                prevDragCursor = dragControls.cursorProgress;
            }
        },
        clearSnapshot: function () {
            prevDragCursor = prevViewportBox = undefined;
        },
        updateLeadAndFollow: function () {
            var _a;
            prevState = __assign({}, state);
            var lead;
            var follow;
            var order = Array.from(stack);
            for (var i = order.length; i--; i >= 0) {
                var element = order[i];
                if (lead)
                    follow !== null && follow !== void 0 ? follow : (follow = element);
                lead !== null && lead !== void 0 ? lead : (lead = element);
                if (lead && follow)
                    break;
            }
            state.lead = lead;
            state.follow = follow;
            state.leadIsExiting = ((_a = state.lead) === null || _a === void 0 ? void 0 : _a.presence) === Presence.Exiting;
            crossfader.setOptions({
                lead: lead,
                follow: follow,
                prevValues: prevValues,
                crossfadeOpacity: (follow === null || follow === void 0 ? void 0 : follow.isPresenceRoot) || (lead === null || lead === void 0 ? void 0 : lead.isPresenceRoot),
            });
            if (
            // Don't crossfade if we've just animated back from lead and switched the
            // old follow to the new lead.
            state.lead !== prevState.follow &&
                (prevState.lead !== state.lead ||
                    prevState.leadIsExiting !== state.leadIsExiting)) {
                needsCrossfadeAnimation = true;
            }
        },
        animate: function (child, shouldCrossfade) {
            var _a;
            if (shouldCrossfade === void 0) { shouldCrossfade = false; }
            if (child === state.lead) {
                if (shouldCrossfade) {
                    /**
                     * Point a lead to itself in case it was previously pointing
                     * to a different visual element
                     */
                    child.pointTo(state.lead);
                }
                else {
                    child.setVisibility(true);
                }
                var config = {};
                var prevParent = (_a = state.follow) === null || _a === void 0 ? void 0 : _a.getProjectionParent();
                if (prevParent) {
                    /**
                     * We'll use this to determine if the element or its layoutId has been reparented.
                     */
                    config.prevParent = prevParent;
                }
                if (child.presence === Presence.Entering) {
                    config.originBox = getFollowViewportBox();
                }
                else if (child.presence === Presence.Exiting) {
                    config.targetBox = getFollowLayout();
                }
                if (needsCrossfadeAnimation) {
                    needsCrossfadeAnimation = false;
                    var transition = child.getDefaultTransition();
                    child.presence === Presence.Entering
                        ? crossfader.toLead(transition)
                        : crossfader.fromLead(transition);
                }
                child.notifyLayoutReady(config);
            }
            else {
                if (shouldCrossfade) {
                    state.lead && child.pointTo(state.lead);
                }
                else {
                    child.setVisibility(false);
                }
            }
        },
    };
}

export { layoutStack };
