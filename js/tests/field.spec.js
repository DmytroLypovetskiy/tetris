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
})(this);