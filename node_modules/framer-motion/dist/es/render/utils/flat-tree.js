import { addUniqueItem, removeItem } from '../../utils/array.js';
import { compareByDepth } from './compare-by-depth.js';

var FlatTree = /** @class */ (function () {
    function FlatTree() {
        this.children = [];
        this.isDirty = false;
    }
    FlatTree.prototype.add = function (child) {
        addUniqueItem(this.children, child);
        this.isDirty = true;
    };
    FlatTree.prototype.remove = function (child) {
        removeItem(this.children, child);
        this.isDirty = true;
    };
    FlatTree.prototype.forEach = function (callback) {
        this.isDirty && this.children.sort(compareByDepth);
        var numChildren = this.children.length;
        for (var i = 0; i < numChildren; i++) {
            callback(this.children[i]);
        }
    };
    return FlatTree;
}());

export { FlatTree };
