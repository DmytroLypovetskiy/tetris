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
         * @returns {boolean}
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
        }
    };

    global.Utils = Utils;
})(this);

