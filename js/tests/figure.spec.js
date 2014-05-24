(function (global) {
    Test.describe('Figure');
    var figure = new global.Figure([
        [0, 1],
        [0, 1],
        [1, 1]
    ], {
        id: 1
    });
    Test.assert(Test.isEqual(figure.model, [
        [0, 1],
        [0, 1],
        [1, 1]
    ]), 'it should set array to the model');

    figure.repaint(3);
    Test.assert(Test.isEqual(figure.model, [
        [0, 3],
        [0, 3],
        [3, 3]
    ]), 'it should repaint the model with appropriate color id');

    figure.rotate();
    Test.assert(Test.isEqual(figure.model, [
        [3, 0, 0],
        [3, 3, 3]
    ]), 'it should rotate the model to the right');
    figure.rotate();
    Test.assert(Test.isEqual(figure.model, [
        [3, 3],
        [3, 0],
        [3, 0]
    ]), 'it should rotate the model to the right second time');

    var field = new global.Field();
    figure.field = field;

    Test.assert(!!figure.move(1, 0), 'it should move right');

    figure.x = 8;
    Test.assert(!figure.move(1, 0), 'it should not move right');

    figure.x = 0;
    Test.assert(!figure.move(-1, 0), 'it should not move left');

    figure.x = 4;
    Test.assert(!!figure.move(-1, 0), 'it should move left');

    figure.y = 0;
    Test.assert(!!figure.move(0, 1), 'it should move down');

    figure.y = 15;
    Test.assert(!figure.move(0, 1), 'it should not move down');

//    // Test collisions
//    figure.field = new global.Field(4,6);
//    figure.field.fieldArray = [
//        [0, 0, 0, 0],
//        [0, 0, 0, 0],
//        [3, 0, 0, 0],
//        [2, 0, 0, 0],
//        [0, 1, 3, 0],
//        [1, 1, 2, 0]
//    ];



//    Test.assert(figure.checkCollisions(), 'collision occurs');






})(this);