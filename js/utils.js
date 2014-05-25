'use strict';
(function (global) {

    /**
     * @class Utils
     * @description
     * Different useful helpers.
     * It will be used in the game
     */
    var Utils  = {
        /**
         * @description
         * Compares two arrays and reruns false if arrays are intersected
         * (an element in the same position in the arrays greater than 0)
         * @param array1
         * @param array2
         * @returns {Boolean}
         */
        isArraysIntersected: function (array1, array2) {
            for (var i = 0, height = array1.length; i < height; i++) {
                for (var j = 0, width = array1[i].length; j < width; j++) {
                    if (array1[i][j] > 0 && array2[i][j] > 0) {
                        return true;
                    }
                }
            }
            return false;
        },

        /**
         * @description
         * Extends all objects from right to left
         * @returns {Object}
         */
        extend: function () {
            if (!arguments.length) {
                throw new Error('Extend function has been called with empty args.');
            }
            if (arguments.length === 1) {
                return arguments[0];
            }
            return Array.prototype.slice.call(arguments, 0).reduce(function (memo, o) {
                for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                        memo[key] = o[key];
                    }
                }
                return memo;
            }, {});
        },

        /**
         * @description
         * Union two arrays into main array
         * @param array1
         * @param array2
         * @returns {Array}
         */
        arrayUnion: function (array1, array2, x, y) {
            var resultArray = JSON.parse(JSON.stringify(array1));
            for (var i = 0; i < array2.length; i++) {
                for (var j = 0; j < array2[i].length; j++) {
                    if (typeof resultArray[i + y] !== 'undefined' && typeof resultArray[i + y][j + x] !== 'undefined' && array2[i][j] !== 0) {
                        resultArray[i + y][j + x] = array2[i][j];
                    }
                }
            }
            return resultArray;
        }
    };


    global.Utils = Utils;
})(this);

