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

        checkAndDeleteLines: function () {
            for (var line = 0; line < this.height; line++) {
                if (this._checkLine(this.fieldArray[line])) {
                    this.fieldArray.splice(line, 1);
                    this.fieldArray.unshift(Array.apply(null, new Array(this.width)).map(Number.prototype.valueOf,0));
                    this.checkAndDeleteLines();
                    break;
                }
            }
            return this.fieldArray;
        },

        /**
         * Checks whether the line is filed completely
         * @param line
         * @returns {boolean}
         * @private
         */
        _checkLine: function (line) {
            for (var i = 0, length = line.length; i < length; i++) {
                if (line[i] === 0) {
                    return false;
                }
            }
            return true;
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
        }



    };
    global.Field  = Field;
})(this);