/** 
based on framer-motion@4.0.3,
Copyright (c) 2018 Framer B.V.
*/
function addUniqueItem(arr, item) {
    arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
    var index = arr.indexOf(item);
    index > -1 && arr.splice(index, 1);
}

export { addUniqueItem, removeItem };
