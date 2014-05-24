'use strict';
(function (global) {

    /**
     * @class Figure
     * @description
     * The main class for a figure.
     * It will be used everywhere in the game
     * @param {Array} model
     * @param {Object} color
     * @param {Field} link to the game field
     * @constructor
     */
    var Figure = function (model, color, field) {
        this.model = model;
        this.color = color;
        this.field = field;
        this.init();
    };

    Figure.prototype = {
        constructor: Figure,
        model: null,
        color: null,
        field: null,
        x: 0,
        y: 0,

        /**
         * Init function
         */
        init: function () {
            this.repaint(this.color.id);
        },

        /**
         * Replaces all none zero values in the model to the specified ID number.
         * It means that each 1 by default becomes from [2..n]
         * @param {Number} colorId
         */
        repaint: function (colorId) {
            this.model.forEach(function (row) {
                row.forEach(function (cell, index) {
                    if (cell > 0) {
                        row[index] = colorId;
                    }
                })

            });
        },

        /**
         * Rotate figure to the right.
         */
        rotate: function () {
            var resultMatrix = [];
            for (var i = 0, xLen = this.model[0].length; i < xLen; i++) {
                resultMatrix[i] = [];
                for (var j = 0, yLen = this.model.length; j < yLen; j++) {
                    resultMatrix[i].unshift(this.model[j][i]);
                }
            }
            this.model = resultMatrix;
        },

        /**
         * Move figure to the left, right and down.
         * @param {Number} x offset (might be positive or negative)
         * @param {Number} y offset
         * @return {Boolean} whether move action was performed successfully
         */
        move: function (x, y) {
            // Save current position
            var currentX = this.x,
                currentY = this.y,
                figWidth = this.model[0].length,
                figHeight = this.model.length;

            // Change position
            this.x += x;
            this.y += y;

            // Check if the figure is not out of field
            if ((this.x + figWidth > this.field.width) || (this.x < 0) || (this.y + figHeight > this.field.height)) {
                return false;
            }

            // Checking collisions with other figures
            if (this.checkCollisions()) {
                this.x = currentX;
                this.y = currentY;
                //this.field.checkLines();
                //this.field.dropFigure(this);
                return false;
            }
            return true;
        },

        /**
         * Checks collisions with other figures
         * @returns {boolean}
         */
        checkCollisions: function () {
            return global.Utils.isArraysIntersected(
                this.model,
                this.field.getSubArray(this.x, this.y, this.model[0].length, this.model.length)
            );
        },

        /**
         * This method is called every time when game
         * is updated. In this case we only need to move figure down.
         */
        update: function () {
            this.move(0, 1);
        }
    };

    global.Figure = Figure;
})(this);

