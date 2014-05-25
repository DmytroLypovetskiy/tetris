'use strict';
(function (global) {
    var Game = function () {
        this.init();
    };

    Game.prototype = {
        field: null,
        renderer: null,
        interval: null,

        /**
         * Init
         */
        init: function () {
            this.field = new global.Field();
            this.renderer = new global.HtmlRenderer({
                container: '#wrapper'
            });
            this.interval = global.setInterval(this.update.bind(this), 200);
            this.dropNewFigure();
        },

        update: function () {
            this.currentFigure.update();
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