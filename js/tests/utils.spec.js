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

    var opt1, opt2, opt3;
    opt1 = {
        a: 1,
        b: 2
    };
    opt2 = {
        b: 100,
        c: 3
    };
    opt3 = {
        c: 200,
        d: 5
    };
    Test.assert(Test.isEqual(global.Utils.extend(opt1, opt2, opt3), {
        a: 1,
        b: 100,
        c: 200,
        d: 5
    }), 'It should extend with all args');

    // Array union
    array2 = [
        [0, 1],
        [0, 1],
        [1, 1],
        [3, 2]
    ];
    array1 = [
        [0, 0, 0, 0, 0],
        [2, 0, 1, 0, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 3, 0, 0],
        [1, 2, 2, 0, 3]
    ];
    Test.assert(Test.isEqual(global.Utils.arrayUnion(array1, array2, 1, 1), [
        [0, 0, 0, 0, 0],
        [2, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 3, 2, 0, 3]
    ]), 'Union array1 with array2. First try');

    Test.assert(Test.isEqual(global.Utils.arrayUnion(array1, array2, 1, 2), [
        [0, 0, 0, 0, 0],
        [2, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 3]
    ]), 'Union array1 with array2. Second try');

    Test.assert(Test.isEqual(global.Utils.arrayUnion(array1, array2, 0, 0), [
        [0, 1, 0, 0, 0],
        [2, 1, 1, 0, 0],
        [1, 1, 2, 0, 0],
        [3, 2, 3, 0, 0],
        [1, 2, 2, 0, 3]
    ]), 'Union array1 with array3. Third try');

})(this);