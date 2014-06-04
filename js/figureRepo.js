'use strict';
(function(global) {
  /**
   * This object is intended for giving figures
   * @singleton
   */
  var FigureRepository = {
    colors: [
      {
        id: 1,
        hex: '#ff0000'
      },
      {
        id: 2,
        hex: '#00ff00'
      },
      {
        id: 3,
        hex: '#0000ff'
      },
      {
        id: 4,
        hex: '#ffff00'
      },
      {
        id: 5,
        hex: '#e940df'
      },
      {
        id: 6,
        hex: '#2acad4'
      },
      {
        id: 7,
        hex: '#ccc4cb'
      }
    ],
    figures: [
      [
        [0, 1],
        [0, 1],
        [1, 1]
      ],
      [
        [1, 0],
        [1, 0],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 1]
      ],
      [
        [1],
        [1],
        [1],
        [1]
      ],
      [
        [1, 1, 1],
        [0, 1, 0]
      ],
      [
        [1, 1, 0],
        [0, 1, 1]
      ],
      [
        [0, 1, 1],
        [1, 1, 0]
      ]
    ],

    /**
     * Getter for figure by num and color
     * @param num
     * @param color
     * @returns {Figure}
     */
    getFigure: function(num, color) {
      return new Figure(JSON.parse(JSON.stringify(this.figures[num])), color);
    },

    /**
     * Gets random figure and rotate in randomly
     * @returns {Figure}
     */
    getRandomFigure: function() {
      var num = this.getRandomFigureNum(),
        color = this.getColorByIndex(num),
        figure = this.getFigure(num, color),
        rotNum = (Math.random() * 3) | 0;

      for (var i = 0; i < rotNum; i++) {
        figure.rotate(true);
      }
      return figure;
    },

    /**
     * Gets random figure number
     * @returns {Number}
     */
    getRandomFigureNum: function() {
      return (Math.random() * this.figures.length) | 0;
    },

    /**
     * Gets random color
     * @returns {Object}
     */
    getRandomColor: function() {
      return this.colors[(Math.random() * this.colors.length) | 0];
    },

    /**
     * Gets the color by index in array.
     * @param {number} index
     * @returns {Color}
     */
    getColorByIndex: function (index) {
      return  this.colors[index];
    }
  };

  global.FigureRepository = FigureRepository;
})(this);