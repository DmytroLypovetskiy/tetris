'use strict';
(function(global) {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                 window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  /**
   * @class
   * @description
   * Main Game class which links all game components together.s
   * @constructor
   */
  var Game = function() {
    this.init();
  };

  Game.prototype = {
    constructor: Game,

    /**
     * Link to the Field.
     * @type Field
     */
    field: null,

    /**
     * Current renderer.
     * @type Renderer
     */
    renderer: null,

    /**
     * Time from the last frame in seconds
     * @type Number
     */
    prevFrameTime: 0,

    /**
     * Current game speed in milliseconds
     * @type number
     */
    currentSpeed: 400,

    /**
     * Total time the game is executed
     * @type number
     */
    progress: 0,

    /**
     * Current game scores
     * @type number
     */
    score: 0,

    /**
     * Current figure
     * @type Figure
     */
    currentFigure: null,

    /**
     * Next figure
     * @type Figure
     */
    nextFigure: null,

    /**
     * Init function
     * @method
     */
    init: function() {
      this.score = 0;
      this.field = new global.Field();
      this.renderer = new global.HtmlRenderer({
        container: '#wrapper'
      });

      this.keyController = new global.KeyController();
      this.setControls();

      this.dropNewFigure();
      this.initLoop();
    },

    /**
     * Setup controls.
     * @method
     */
    setControls: function() {
      // Event for rotate
      this.keyController.on(global.KEY.UP_ARROW, function() {
        this.currentFigure.rotate();
      }, this);

      // Event for rotate
      this.keyController.on(global.KEY.SPACE, function() {
        this.currentFigure.rotate();
      }, this);

      // Event for move figure to the left
      this.keyController.on(global.KEY.LEFT_ARROW, function() {
        this.currentFigure.move(-1, 0);
      }, this);

      // Event for move figure to the right
      this.keyController.on(global.KEY.RIGHT_ARROW, function() {
        this.currentFigure.move(1, 0);
      }, this);

      // Event for move figure to the bottom
      this.keyController.on(global.KEY.DOWN_ARROW, function() {
        this.currentFigure.move(0, 1);
      }, this);
    },

    /**
     * Launches main game loop
     * @method
     */
    initLoop: function() {
      requestAnimationFrame(this.update.bind(this));
    },

    /**
     * This method will be executed each game frame.
     * @method
     * @param {number} [timestamp] current timestamp
     */
    update: function(timestamp) {
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

    /**
     * Draws the game.
     * @method
     */
    draw: function() {
      this.renderer.render(this.field, this.currentFigure, this.nextFigure);
    },

    /**
     * Create and drops new figure to the field.
     */
    dropNewFigure: function() {
      // If nextFigure is not created yet (when the game is started)
      if (!this.nextFigure) {
        this.nextFigure = global.FigureRepository.getRandomFigure();
      }
      this.currentFigure = this.nextFigure;
      this.currentFigure.field = this.field;
      this.currentFigure.x = this.field.width / 2 - 1;
      this.nextFigure = global.FigureRepository.getRandomFigure();
      if (this.currentFigure.checkCollisions()) {
        this.draw();
        this.gameOver();
      }
    },

    /**
     * This method executes when the game is over
     * @method
     */
    gameOver: function() {
      alert('Game Over. Looser!!!');
      this.init();
    }
  };

  global.Game = Game;

})(this);