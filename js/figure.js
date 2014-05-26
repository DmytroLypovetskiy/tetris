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
                });
            });
        },

        /**
         * Rotate figure to the right.
         * @param {Boolean} should we ignore field and do rotate anyway
         */
        rotate: function (force) {
            var resultMatrix = [],
                isIntersected,
                force = !!force,
                originalX = this.x,
                originalY = this.y;

            for (var i = 0, xLen = this.model[0].length; i < xLen; i++) {
                resultMatrix[i] = [];
                for (var j = 0, yLen = this.model.length; j < yLen; j++) {
                    resultMatrix[i].unshift(this.model[j][i]);
                }
            }

            isIntersected = !force && global.Utils.isArraysIntersected(
                resultMatrix,
                this.field.getSubArray(this.x, this.y, resultMatrix[0].length, resultMatrix.length));

            this.x -= ((resultMatrix[0].length - this.model[0].length) / 2) | 0;
            this.y -= ((resultMatrix.length - this.model.length) / 2) | 0;

            if (!force && (isIntersected || (resultMatrix[0].length + this.x > this.field.width) || (this.x < 0) || (resultMatrix.length + this.y > this.field.height) )) {
                this.x = originalX;
                this.y = originalY;
                return false;
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
                figHeight = this.model.length,
                isCollision = false;

            // Change position
            this.x += x;
            this.y += y;

            // Check if the figure is not out of field
            if ((this.x + figWidth > this.field.width) || (this.x < 0) || (this.y + figHeight > this.field.height)) {
                isCollision = true;
            }
            if (!isCollision) {
                // Checking collisions with other figures
                if (this.checkCollisions()) {
                    isCollision = true;
                }
            }
            if (isCollision) {
                this.x = currentX;
                this.y = currentY;

                // In case moving down we have to do additional actions
                if (y !== 0) {
                    global.game.dropNewFigure();
                    this.field.fieldArray = global.Utils.arrayUnion(this.field.fieldArray, this.model, this.x, this.y);
                }
                this.field.checkAndDeleteLines();
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

