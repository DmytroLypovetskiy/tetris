'use strict';
(function (global) {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var Game = function () {
        this.init();
    };

    Game.prototype = {
        field: null,
        renderer: null,
        prevFrameTime: 0,
        currentSpeed: 200,
        progress: 0,

        /**
         * Init
         */
        init: function () {
            this.field = new global.Field();
            this.renderer = new global.HtmlRenderer({
                container: '#wrapper'
            });

            this.keyController = new global.KeyController();
            // Event for rotate
            this.keyController.on(global.KEY.SPACE, function () {
                this.currentFigure.rotate();
            }, this);
            // Event for move figure to the left
            this.keyController.on(global.KEY.LEFT_ARROW, function () {
                this.currentFigure.move(-1,0);
            }, this);
            // Event for move figure to the right
            this.keyController.on(global.KEY.RIGHT_ARROW, function () {
                this.currentFigure.move(1,0);
            }, this);
            // Event for move figure to the bottom
            this.keyController.on(global.KEY.DOWN_ARROW, function () {
                this.currentFigure.move(0,1);
            }, this);

            this.dropNewFigure();
            this.initLoop();
        },

        initLoop: function () {
            requestAnimationFrame(this.update.bind(this));
        },

        update: function (timestamp) {
            var delta = timestamp - this.prevFrameTime;
            this.prevFrameTime = timestamp;
            this.progress += delta;
            if (this.progress >= this.currentSpeed) {
                this.progress = 0;
                this.currentFigure.update();
            }
            
            this.draw();
            requestAnimationFrame(this.update.bind(this));

        },

        draw: function () {
            this.renderer.render(this.field, this.currentFigure);
        },

        dropNewFigure: function () {
            this.currentFigure = global.FigureRepository.getRandomFigure();
            this.currentFigure.field = this.field;
            this.currentFigure.x = this.field.width/2 - 1;
        }
    };
    global.Game  = Game;


})(this);