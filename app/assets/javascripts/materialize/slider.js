var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($, Vel) {
  'use strict';

  var _defaults = {
    indicators: true,
    height: 400,
    duration: 500,
    interval: 6000
  };

  /**
   * @class
   *
   */

  var Slider = function () {
    /**
     * Construct Slider instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Slider(el, options) {
      var _this = this;

      _classCallCheck(this, Slider);

      // If exists, destroy and reinitialize
      if (!!el.M_Slider) {
        el.M_Slider.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Slider = this;

      /**
       * Options for the modal
       * @member Slider#options
       * @prop {Boolean} [indicators=true] - Show indicators
       * @prop {Number} [height=400] - height of slider
       * @prop {Number} [duration=500] - Length in ms of slide transition
       * @prop {Number} [interval=6000] - Length in ms of slide interval
       */
      this.options = $.extend({}, Slider.defaults, options);

      // setup
      this.$slider = this.$el.find('.slides');
      this.$slides = this.$slider.children('li');
      this.activeIndex = this.$slider.find('.active').index();
      if (this.activeIndex != -1) {
        this.$active = this.$slides.eq(this.activeIndex);
      }

      this._setSliderHeight();

      // Set initial positions of captions
      this.$slides.find('.caption').each(function (el) {
        _this._animateCaptionIn(el, 0);
      });

      // Move img src into background-image
      this.$slides.find('img').each(function (el) {
        var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        if ($(el).attr('src') !== placeholderBase64) {
          $(el).css('background-image', 'url("' + $(el).attr('src') + '")');
          $(el).attr('src', placeholderBase64);
        }
      });

      this._setupIndicators();

      // Show active slide
      if (this.$active) {
        this.$active.css('display', 'block');
      } else {
        this.$slides.first().addClass('active');
        Vel(this.$slides.first()[0], { opacity: 1 }, { duration: this.options.duration, queue: false, easing: 'easeOutQuad' });

        this.activeIndex = 0;
        this.$active = this.$slides.eq(this.activeIndex);

        // Update indicators
        if (this.options.indicators) {
          this.$indicators.eq(this.activeIndex).addClass('active');
        }
      }

      // Adjust height to current slide
      this.$active.find('img').each(function (el) {
        Vel(_this.$active.find('.caption')[0], { opacity: 1, translateX: 0, translateY: 0 }, { duration: _this.options.duration, queue: false, easing: 'easeOutQuad' });
      });

      this._setupEventHandlers();

      // auto scroll
      this.start();
    }

    _createClass(Slider, [{
      key: 'destroy',


      /**
       * Teardown component
       */
      value: function destroy() {
        this.pause();
        this._removeIndicators();
        this._removeEventHandlers();
        this.el.M_Slider = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: '_setupEventHandlers',
      value: function _setupEventHandlers() {
        var _this2 = this;

        this._handleIntervalBound = this._handleInterval.bind(this);
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);

        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.addEventListener('click', _this2._handleIndicatorClickBound);
          });
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: '_removeEventHandlers',
      value: function _removeEventHandlers() {
        var _this3 = this;

        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.removeEventListener('click', _this3._handleIndicatorClickBound);
          });
        }
      }

      /**
       * Handle indicator click
       * @param {Event} e
       */

    }, {
      key: '_handleIndicatorClick',
      value: function _handleIndicatorClick(e) {
        var currIndex = $(e.target).index();
        this.set(currIndex);
      }

      /**
       * Handle Interval
       */

    }, {
      key: '_handleInterval',
      value: function _handleInterval() {
        var newActiveIndex = this.$slider.find('.active').index();
        if (this.$slides.length === newActiveIndex + 1) newActiveIndex = 0; // loop to start
        else newActiveIndex += 1;

        this.set(newActiveIndex);
      }

      /**
       * Animate in caption
       * @param {Element} caption
       * @param {Number} duration
       */

    }, {
      key: '_animateCaptionIn',
      value: function _animateCaptionIn(caption, duration) {
        var velocityOptions = {
          opacity: 0
        };

        if ($(caption).hasClass('center-align')) {
          velocityOptions.translateY = -100;
        } else if ($(caption).hasClass('right-align')) {
          velocityOptions.translateX = 100;
        } else if ($(caption).hasClass('left-align')) {
          velocityOptions.translateX = -100;
        }

        Vel(caption, velocityOptions, { duration: duration, queue: false });
      }

      /**
       * Set height of slider
       */

    }, {
      key: '_setSliderHeight',
      value: function _setSliderHeight() {
        // If fullscreen, do nothing
        if (!this.$el.hasClass('fullscreen')) {
          if (this.options.indicators) {
            // Add height if indicators are present
            this.$el.css('height', this.options.height + 40 + 'px');
          } else {
            this.$el.css('height', this.options.height + 'px');
          }
          this.$slider.css('height', this.options.height + 'px');
        }
      }

      /**
       * Setup indicators
       */

    }, {
      key: '_setupIndicators',
      value: function _setupIndicators() {
        var _this4 = this;

        if (this.options.indicators) {
          this.$indicators = $('<ul class="indicators"></ul>');
          this.$slides.each(function (el, index) {
            var $indicator = $('<li class="indicator-item"></li>');
            _this4.$indicators.append($indicator[0]);
          });
          this.$el.append(this.$indicators[0]);
          this.$indicators = this.$indicators.children('li.indicator-item');
        }
      }

      /**
       * Remove indicators
       */

    }, {
      key: '_removeIndicators',
      value: function _removeIndicators() {
        this.$el.find('ul.indicators').remove();
      }

      /**
       * Cycle to nth item
       * @param {Number} index
       */

    }, {
      key: 'set',
      value: function set(index) {
        var _this5 = this;

        // Wrap around indices.
        if (index >= this.$slides.length) index = 0;else if (index < 0) index = this.$slides.length - 1;

        // Only do if index changes
        if (this.activeIndex != index) {
          this.$active = this.$slides.eq(this.activeIndex);
          var $caption = this.$active.find('.caption');

          this.$active.removeClass('active');
          Vel(this.$active[0], { opacity: 0 }, { duration: this.options.duration, queue: false, easing: 'easeOutQuad',
            complete: function () {
              _this5.$slides.not('.active').each(function (el) {
                Vel(el, { opacity: 0, translateX: 0, translateY: 0 }, { duration: 0, queue: false });
              });
            }.bind(this)
          });

          this._animateCaptionIn($caption[0], this.options.duration);

          // Update indicators
          if (this.options.indicators) {
            this.$indicators.eq(this.activeIndex).removeClass('active');
            this.$indicators.eq(index).addClass('active');
          }

          Vel(this.$slides.eq(index)[0], { opacity: 1 }, { duration: this.options.duration, queue: false, easing: 'easeOutQuad' });
          Vel(this.$slides.eq(index).find('.caption')[0], { opacity: 1, translateX: 0, translateY: 0 }, { duration: this.options.duration, delay: this.options.duration, queue: false, easing: 'easeOutQuad' });

          this.$slides.eq(index).addClass('active');
          this.activeIndex = index;

          // Reset interval
          this.start();
        }
      }

      /**
       * Pause slider interval
       */

    }, {
      key: 'pause',
      value: function pause() {
        clearInterval(this.interval);
      }

      /**
       * Start slider interval
       */

    }, {
      key: 'start',
      value: function start() {
        clearInterval(this.interval);
        this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval);
      }

      /**
       * Move to next slide
       */

    }, {
      key: 'next',
      value: function next() {
        var newIndex = this.activeIndex + 1;

        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0;else if (newIndex < 0) newIndex = this.$slides.length - 1;

        this.set(newIndex);
      }

      /**
       * Move to previous slide
       */

    }, {
      key: 'prev',
      value: function prev() {
        var newIndex = this.activeIndex - 1;

        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0;else if (newIndex < 0) newIndex = this.$slides.length - 1;

        this.set(newIndex);
      }
    }], [{
      key: 'init',
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          arr.push(new Slider(this, options));
        });
        return arr;
      }

      /**
       * Get Instance
       */

    }, {
      key: 'getInstance',
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Slider;
      }
    }, {
      key: 'defaults',
      get: function () {
        return _defaults;
      }
    }]);

    return Slider;
  }();

  M.Slider = Slider;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Slider, 'slider', 'M_Slider');
  }
})(cash, M.Vel);
