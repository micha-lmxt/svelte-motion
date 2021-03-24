import { addUniqueItem, removeItem } from './array.js';

function subscriptionManager() {
    var subscriptions = [];
    return {
        add: function (handler) {
            addUniqueItem(subscriptions, handler);
            return function () { return removeItem(subscriptions, handler); };
        },
        notify: function (a, b, c) {
            var numSubscriptions = subscriptions.length;
            if (!numSubscriptions)
                return;
            if (numSubscriptions === 1) {
                /**
                 * If there's only a single handler we can just call it without invoking a loop.
                 */
                subscriptions[0](a, b, c);
            }
            else {
                for (var i = 0; i < numSubscriptions; i++) {
                    /**
                     * Check whether the handler exists before firing as it's possible
                     * the subscriptions were modified during this loop running.
                     */
                    var handler = subscriptions[i];
                    handler && handler(a, b, c);
                }
            }
        },
        getSize: function () { return subscriptions.length; },
        clear: function () {
            subscriptions.length = 0;
        },
    };
}

export { subscriptionManager };
