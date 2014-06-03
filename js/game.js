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
     * How much figures for the level.
     * @constant
     * @type Number
     */
    FIGURES_PER_LEVEL: 50,

    /**
     * Link to the Field.
     */
    field: null,

    /**
     * Current renderer.
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
    currentSpeed: 1000,

    /**
     * Total time the game is executed
     * @type number
     */
    progress: 0,

    /**
     * Current game scores
     * @type object
     */
    stats: null,

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
      this.stats = {
        lines: 0,
        scores: 0,
        figures: 0,
        level: 1
      };

      this.field = new global.Field();
      this.field.onLinesUpdated = this.onLinesUpdated.bind(this);
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
      this.initLoop();
    },

    /**
     * Draws the game.
     * @method
     */
    draw: function() {
      this.renderer.render(this.field, this.currentFigure, this.nextFigure, this.stats);
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
      this.currentFigure.onCollided = this.onFiguresCollided.bind(this);
      this.nextFigure = global.FigureRepository.getRandomFigure();
      if (this.currentFigure.checkCollisions()) {
        this.draw();
        this.gameOver();
      }
      // Increase the num of figures
      this.stats.figures++;
    },

    /**
     * Method will be called every time, when some line
     * are disposed.
     * @param {number} [lineNum] count of lines
     */
    onLinesUpdated: function (lineNum) {
      this.addScores(lineNum);
    },

    /**
     * Updates stats.
     * @param {number=} {lineNum} number of lines to be added
     */
    addScores: function (lineNum) {
      lineNum = lineNum || 1;
      this.stats.lines += lineNum;
      this.stats.scores += lineNum * lineNum * 10;
    },

    /**
     * Will be called every time when figures collide with bottom border
     * or another figures.s
     * @method
     */
    onFiguresCollided: function () {
      // update level
      if (this.stats.figures >= this.FIGURES_PER_LEVEL) {
        this.stats.figures = 0;
        this.stats.level = Math.min(9, this.stats.level + 1);
        this.currentSpeed = 1000 - this.stats.level * 100;
      }
      // drop new figure into the field
      this.dropNewFigure();
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