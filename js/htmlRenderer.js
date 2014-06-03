'use strict';
(function(global) {

  /**
   * Renders the game using DOM.
   * @class
   * @param options
   * @constructor
   */
  var HtmlRenderer = function(options) {
    this.options = global.Utils.extend({}, this.defaultOptions, options);
  };

  HtmlRenderer.prototype = {
    constructor: HtmlRenderer,
    defaultOptions: {
      cellSize: 40,
      container: 'body'
    },

    /**
     * Creates UI for game field.
     * @param {Field} [field]
     * @param {Figure} [figure] current figure
     * @param {Figure} [nextFigure] next figure
     * @param {Object} [stats] statistic and scores
     */
    render: function(field, figure, nextFigure, stats) {
      var mainField = document.createElement('div'),
        nextFigureArea = document.createElement('div'),
        container = document.querySelector(this.options.container),
        resultArray;

      // Styles for the main field
      mainField.style.width = field.width * this.options.cellSize + 'px';
      mainField.style.height = field.height * this.options.cellSize + 'px';
      mainField.id = 'gameField';
      // Styles for the next figure
      nextFigureArea.style.width = nextFigure.model[0].length * this.options.cellSize + 'px';
      nextFigureArea.style.height = nextFigure.model.length * this.options.cellSize + 'px';
      nextFigureArea.style.float = 'right';
      nextFigureArea.id = 'nextFigure';
      // push figure into array
      resultArray = global.Utils.arrayUnion(field.fieldArray, figure.model, figure.x, figure.y);
      // render main field
      mainField.appendChild(this._renderField(resultArray));
      // render next figure
      nextFigureArea.appendChild(this._renderField(nextFigure.model));
      // clear screen
      container.innerHTML = '';
      container.appendChild(nextFigureArea);
      container.appendChild(mainField);
    },

    /**
     * Renders the array and return it as document fragment.
     * Might be used for rendering main field or next figure.
     * @param {Array} field
     * @returns {DocumentFragment}
     * @private
     */
    _renderField: function(field) {
      var color,
        docFragment = document.createDocumentFragment();

      for (var i = 0; i < field.length; i++) {
        for (var j = 0; j < field[i].length; j++) {
          var cell = document.createElement('div');
          cell.style.width = this.options.cellSize + 'px';
          cell.style.height = this.options.cellSize + 'px';

          color = (field[i][j] !== 0) ? global.FigureRepository.colors.filter(function(c) {
            return c.id === field[i][j];
          })[0] : '#ffffff';
          cell.style.backgroundColor = color.hex;
          cell.className = 'cell';
          if (field[i][j] !== 0) {
            cell.className += ' filled';
          }
          docFragment.appendChild(cell);
        }
      }
      return docFragment;
    }
  };
  global.HtmlRenderer = HtmlRenderer;
})(this);