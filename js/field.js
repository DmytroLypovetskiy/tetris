'use strict';
(function (global) {
    /**
     *
     * @param width of the game field
     * @param height of the game field
     * @constructor
     */
    var Field = function (width, height) {
        this.width = width || 10;
        this.height = height || 18;
        this.init();
    };

    Field.prototype = {
        width : null,
        height: null,
        fieldArray: null,

        init: function () {

            this.fieldArray = this.createFieldArray(this.width, this.height);
            this.htmlRenderer(this.width, this.height)
        },

        /**
         * Creates new array and fills it by zero.
         * @param {Number} width
         * @param {Number} height
         * @returns {Array}
         */
        createFieldArray: function (width, height) {
            var resultArray = [];

            for (var i = 0; i < height; i++) {
                resultArray[i] = [];
                for (var j = 0; j < width; j++) {
                    resultArray[i].push(0);
                }
            }
            return resultArray;
        },

        checkLines: function () {

        },

        /**
         * Returns the sub array of field
         * @param x
         * @param y
         * @param width
         * @param height
         */
        getSubArray: function (x, y, width, height) {
            var resultArray = [],
                tempArray;

            for (var i = y; i < height + y; i++) {
                tempArray = [];
                for (var j = x; j < width + x; j++) {
                    tempArray.push(this.fieldArray[i][j]);
                }
                resultArray.push(tempArray);
            }
            return resultArray;

        },

        /**
         * Creates UI for game field.
         * @param {Number} width
         * @param {Number} height
         */
        htmlRenderer: function (width, height) {
            var mainField = document.createElement("div"),
                cellSize = 40;

            mainField.style.width = width * cellSize + "px";
            mainField.style.height = height * cellSize + "px";
            mainField.id = "gameField";
            document.body.appendChild(mainField);

            for (var i = 0; i < (width * height)-1; i++) {
                var cell = document.createElement("div");
                cell.style.width = cellSize + "px";
                cell.style.height = cellSize + "px";
                cell.className = "cell";
                document.getElementById('gameField').appendChild(cell);
            }
        }

    };
    global.Field  = Field;
})(this);