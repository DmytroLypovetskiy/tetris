'use strict';
(function (global) {

    var HtmlRenderer = function (options) {
        this.options = global.Utils.extend({}, this.defaultOptions, options);
    };

    HtmlRenderer.prototype = {
        defaultOptions: {
            cellSize: 40,
            container: 'body'
        },

        /**
         * Creates UI for game field.
         * @param {Field}
         */
        render: function (field, figure) {
            var mainField = document.createElement('div'),
                container = document.querySelector(this.options.container),
                resultArray;

            mainField.style.width = field.width * this.options.cellSize + 'px';
            mainField.style.height = field.height * this.options.cellSize + 'px';
            mainField.id = 'gameField';
            // clear screen
            container.innerHTML = '';
            container.appendChild(mainField);

            // push figure into array
            resultArray = global.Utils.arrayUnion(field.fieldArray, figure.model, figure.x, figure.y);
            for (var i = 0; i < field.height; i++) {
                for (var j = 0; j < field.width; j++) {
                    var cell = document.createElement('div');
                    cell.style.width = this.options.cellSize + 'px';
                    cell.style.height = this.options.cellSize + 'px';
                    cell.style.backgroundColor = resultArray[i][j] > 0 ? '#ff0000': '';
                    cell.className = 'cell';
                    document.getElementById('gameField').appendChild(cell);
                }

            }
        }


    };
    global.HtmlRenderer  = HtmlRenderer;
})(this);