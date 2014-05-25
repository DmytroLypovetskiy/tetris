(function (global) {
    Test.describe('FigureRepo');

    var figure = FigureRepository.getFigure(4, FigureRepository.colors[1]);
    Test.assert(Test.isEqual(figure.model, [
        [2, 2, 2],
        [0, 2, 0]
    ]), 'it should return correct array and color');

    var figure = FigureRepository.getRandomFigure();
    Test.assert(figure instanceof Figure, 'it should return random figure as instance of Figure');

    Test.assert(figure.model.length > 0, 'it should return true, if array is not empty')

})(this);