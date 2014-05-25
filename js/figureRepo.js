'use strict';
(function (global) {
    /**
     * This object is intended for giving figures
     * @singleton
     */
    var FigureRepository = {
        colors: {
            'red': {
                id: 1,
                hex: '#ff0000'
            },
            'blue': {
                id: 2,
                hex: '#00ff00'
            }
        },
        figures: [
            [
                [0, 1],
                [0, 1],
                [1, 1]
            ],
            [
                [1, 0],
                [1, 0],
                [1, 1]
            ],
            [
                [1, 1],
                [1, 1]
            ],
            [
                [1],
                [1],
                [1],
                [1]
            ],
            [
                [1, 1, 1],
                [0, 1, 0]
            ],
            [
                [1, 1, 0],
                [0, 1, 1]
            ],
            [
                [0, 1, 1],
                [1, 1, 0]
            ]
        ],

        /**
         * Getter for figure by num and color
         * @param num
         * @param color
         * @returns {Figure}
         */
        getFigure: function (num, color) {
            return new Figure(JSON.parse(JSON.stringify(this.figures[num])), color);
        },

        /**
         * Gets random figure and rotate in randomly
         * @returns {Figure}
         */
        getRandomFigure: function () {
            var num = this.getRandomFigureNum(),
                color = this.getRandomColor(),
                figure = this.getFigure(num, color),
                rotNum = (Math.random() * 3) | 0;

            for (var i = 0; i < rotNum; i++) {
                figure.rotate();
            }
            return figure;
        },

        /**
         * Gets random figure number
         * @returns {Number}
         */
        getRandomFigureNum: function () {
            return (Math.random() * this.figures.length) | 0;
        },

        /**
         * Gets random color
         * @returns {Color}
         */
        getRandomColor: function () {
            var result;
            var count = 0;
            for (var prop in this.colors)
                if (Math.random() < 1 / ++count)
                    result = prop;
            return this.colors[result];
        }
    };

    global.FigureRepository = FigureRepository;
})(this);