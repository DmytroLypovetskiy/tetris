(function (global) {
    Test.describe('Utils');
    var array1, array2;
    array1 = [
        [0, 1],
        [0, 1],
        [1, 1]
    ];
    array2 = [
        [0, 0],
        [0, 0],
        [0, 1]
    ];
    Test.assert(global.Utils.isArraysIntersected(array1, array2) === true, 'It should be true if they are intersected');

    array1 = [
        [0, 1],
        [0, 1],
        [1, 1]
    ];
    array2 = [
        [0, 0],
        [1, 0],
        [0, 0]
    ];
    Test.assert(global.Utils.isArraysIntersected(array1, array2) === false, 'It should be true if they are intersected');

    array1 = [
        [0, 1],
        [0, 1],
        [1, 1]
    ];
    array2 = [
        [1, 1],
        [0, 0],
        [0, 0]
    ];
    Test.assert(global.Utils.isArraysIntersected(array1, array2) === true, 'It should be true if they are intersected');

    array1 = [
        [0, 1],
        [0, 1],
        [1, 1]
    ];
    array2 = [
        [0, 0],
        [0, 0],
        [0, 0]
    ];
    Test.assert(global.Utils.isArraysIntersected(array1, array2) === false, 'It should be true if they are intersected');

})(this);