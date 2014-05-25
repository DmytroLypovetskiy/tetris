(function (global) {
    Test.describe('Field');
    var field = new global.Field();
    Test.assert(field.width === 10 && field.height === 18,
        'It should be 10 as width and 18 as height by default');

    Test.assert(Test.isEqual(field.createFieldArray(4, 5), [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]), 'It should be an array filled by zero');


    field = new global.Field(4, 5);
    field.fieldArray = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 1],
        [0, 0, 0, 0]
    ];

    Test.assert(Test.isEqual(field.getSubArray(1, 2, 3, 2), [
        [0, 1, 0],
        [1, 1, 1]

    ]), 'It should get correct sub array');
    field.width = 3;
    field.height = 3;
    field.fieldArray = [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
    ];
    Test.assert(Test.isEqual(field.checkAndDeleteLines(), [
        [0, 0, 0],
        [0, 0, 0],
        [0, 1, 0]
    ]), 'Remove line, if it has all items are not equal 0. Try 1');

    field.fieldArray = [
        [0, 0, 0],
        [3, 1, 2],
        [0, 1, 1]
    ];
    Test.assert(Test.isEqual(field.checkAndDeleteLines(), [
        [0, 0, 0],
        [0, 0, 0],
        [0, 1, 1]
    ]), 'Remove line, if it has all items are not equal 0. Try 2');

    Test.assert(field._checkLine([1, 1, 1]) === true, 'This line is filled with none 0 values');

    Test.assert(field._checkLine([1, 1, 0]) === false, 'This line is not filled with none 0 values');

})(this);