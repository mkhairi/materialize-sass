var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
  'use strict';

  var _defaults = {
    classes: ''
  };

  /**
   * @class
   *
   */

  var Select = function () {
    /**
     * Construct Select instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Select(el, options) {
      _classCallCheck(this, Select);

      // If exists, destroy and reinitialize
      if (!!el.M_Select) {
        el.M_Select.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Select = this;

      /**
       * Options for the select
       * @member Select#options
       */
      this.options = $.extend({}, Select.defaults, options);

      this.isMultiple = this.$el.prop('multiple');

      // Setup
      this.valuesSelected = [];
      this.$selectedOptions = $();
      this._setupDropdown();

      this._setupEventHandlers();
    }

    _createClass(Select, [{
      key: 'destroy',


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_Select = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: '_setupEventHandlers',
      value: function _setupEventHandlers() {
        var _this = this;

        this._handleSelectChangeBound = this._handleSelectChange.bind(this);
        this._handleOptionClickBound = this._handleOptionClick.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);

        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.addEventListener('click', _this._handleOptionClickBound);
        });
        this.el.addEventListener('change', this._handleSelectChangeBound);
        this.input.addEventListener('click', this._handleInputClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: '_removeEventHandlers',
      value: function _removeEventHandlers() {
        var _this2 = this;

        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.removeEventListener('click', _this2._handleOptionClickBound);
        });
        this.el.removeEventListener('change', this._handleSelectChangeBound);
        this.input.removeEventListener('click', this._handleInputClickBound);
        this.input.removeEventListener('focus', this._handleInputFocusBound);
      }

      /**
       * Handle Select Change
       * @param {Event} e
       */

    }, {
      key: '_handleSelectChange',
      value: function _handleSelectChange(e) {
        this._setValueToInput();
      }

      /**
       * Handle Option Click
       * @param {Event} e
       */

    }, {
      key: '_handleOptionClick',
      value: function _handleOptionClick(e) {
        e.preventDefault();
        var option = $(e.target).closest('li')[0];
        var optionIndex = $(this.dropdownOptions).find('li:not(.optgroup)').index(option);
        if (!$(option).hasClass('disabled') && !$(option).hasClass('optgroup')) {
          var selected = true;

          if (this.isMultiple) {
            var checkbox = $(option).find('input[type="checkbox"]');
            checkbox.prop('checked', !checkbox.prop('checked'));
            selected = this._toggleEntryFromArray(optionIndex);
          } else {
            $(this.dropdownOptions).find('li').removeClass('active');
            $(option).toggleClass('active');
            this.input.value = option.textContent;
          }

          this._activateOption($(this.dropdownOptions), option);
          this.$el.find('option').eq(optionIndex).prop('selected', selected);
          this.$el.trigger('change');
        }

        e.stopPropagation();
      }

      /**
       * Handle Input Click
       */

    }, {
      key: '_handleInputClick',
      value: function _handleInputClick() {
        if (this.dropdown && this.dropdown.isOpen) {
          this._setValueToInput();
          this._setSelectedStates();
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: '_setupDropdown',
      value: function _setupDropdown() {
        var _this3 = this;

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add();
        $(this.wrapper).addClass('select-wrapper' + ' ' + this.options.classes);
        this.$el.before($(this.wrapper));
        this.wrapper.appendChild(this.el);

        if (this.el.disabled) {
          this.wrapper.classList.add('disabled');
        }

        // Create dropdown
        this.$selectOptions = this.$el.children('option, optgroup');
        this.dropdownOptions = document.createElement('ul');
        this.dropdownOptions.id = 'select-options-' + M.guid();
        $(this.dropdownOptions).addClass('dropdown-content select-dropdown ' + (this.isMultiple ? 'multiple-select-dropdown' : ''));

        // Create dropdown structure.
        if (this.$selectOptions.length) {
          this.$selectOptions.each(function (el) {
            if ($(el).is('option')) {
              // Direct descendant option.
              var optionEl = void 0;
              if (_this3.isMultiple) {
                optionEl = _this3._appendOptionWithIcon(_this3.$el, el, 'multiple');
              } else {
                optionEl = _this3._appendOptionWithIcon(_this3.$el, el);
              }

              if ($(el).prop('selected')) {
                _this3.$selectedOptions.add(optionEl);
              }
            } else if ($(el).is('optgroup')) {
              // Optgroup.
              var selectOptions = $(el).children('option');
              $(_this3.dropdownOptions).append($('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]);

              selectOptions.each(function (el) {
                var optionEl = _this3._appendOptionWithIcon(_this3.$el, el, 'optgroup-option');
                if ($(el).prop('selected')) {
                  _this3.$selectedOptions.add(optionEl);
                }
              });
            }
          });
        }

        this.$el.after(this.dropdownOptions);

        // Add input dropdown
        this.input = document.createElement('input');
        $(this.input).addClass('select-dropdown dropdown-trigger');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('readonly', 'true');
        this.input.setAttribute('data-target', this.dropdownOptions.id);
        if (this.el.disabled) {
          $(this.input).prop('disabled', 'true');
        }

        this.$el.before(this.input);
        this._setValueToInput();

        // Add caret
        var dropdownIcon = $('<svg class="caret" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
        this.$el.before(dropdownIcon[0]);

        // Initialize dropdown
        if (!this.el.disabled) {
          var dropdownOptions = {};
          if (this.isMultiple) {
            dropdownOptions.closeOnClick = false;
          }
          this.dropdown = new M.Dropdown(this.input, dropdownOptions);
        }

        // Add initial selections
        this._setSelectedStates();
      }

      /**
       * Remove dropdown
       */

    }, {
      key: '_removeDropdown',
      value: function _removeDropdown() {
        $(this.wrapper).find('.caret').remove();
        $(this.input).remove();
        $(this.dropdownOptions).remove();
        $(this.wrapper).before(this.$el);
        $(this.wrapper).remove();
      }

      /**
       * Setup dropdown
       * @param {Element} select  select element
       * @param {Element} option  option element from select
       * @param {String} type
       * @return {Element}  option element added
       */

    }, {
      key: '_appendOptionWithIcon',
      value: function _appendOptionWithIcon(select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = option.disabled ? 'disabled ' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
        var multipleCheckbox = this.isMultiple ? '<label><input type="checkbox"' + disabledClass + '"/><span>' + option.innerHTML + '</span></label>' : option.innerHTML;
        var liEl = $('<li></li>');
        var spanEl = $('<span></span>');
        spanEl.html(multipleCheckbox);
        liEl.addClass(disabledClass + ' ' + optgroupClass);
        liEl.append(spanEl);

        // add icons
        var iconUrl = option.getAttribute('data-icon');
        var classes = option.getAttribute('class');
        if (!!iconUrl) {
          var imgEl = $('<img alt="" src="' + iconUrl + '">');
          liEl.prepend(imgEl);
        }

        // Check for multiple type.
        $(this.dropdownOptions).append(liEl[0]);
        return liEl[0];
      }

      /**
       * Toggle entry from option
       * @param {Number} entryIndex
       * @return {Boolean}  if entry was added or removed
       */

    }, {
      key: '_toggleEntryFromArray',
      value: function _toggleEntryFromArray(entryIndex) {
        var index = this.valuesSelected.indexOf(entryIndex),
            notAdded = index === -1;

        if (notAdded) {
          this.valuesSelected.push(entryIndex);
        } else {
          this.valuesSelected.splice(index, 1);
        }

        $(this.dropdownOptions).find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

        // use notAdded instead of true (to detect if the option is selected or not)
        this.$el.find('option').eq(entryIndex).prop('selected', notAdded);

        return notAdded;
      }

      /**
       * Set value to input
       */

    }, {
      key: '_setValueToInput',
      value: function _setValueToInput() {
        var value = '';
        var options = this.$el.find('option');

        options.each(function (el, i) {
          if ($(el).prop('selected')) {
            var text = $(el).text();
            value === '' ? value += text : value += ', ' + text;
          }
        });

        if (value === '') {
          var firstDisabled = this.$el.find('option:disabled').eq(0);
          if (firstDisabled.length) {
            value = firstDisabled.text();
          }
        }

        this.input.value = value;
      }

      /**
       * Set selected state of dropdown too match actual select element
       */

    }, {
      key: '_setSelectedStates',
      value: function _setSelectedStates() {
        var _this4 = this;

        this.valuesSelected = [];
        var $onlyOptions = $(this.dropdownOptions).find('li:not(.optgroup)');
        this.$el.find('option').each(function (el, i) {
          var option = $onlyOptions.eq(i);

          if ($(el).prop('selected')) {
            option.find('input[type="checkbox"]').prop("checked", true);
            _this4._activateOption($(_this4.dropdownOptions), option);
            _this4.valuesSelected.push(i);
          } else {
            option.find('input[type="checkbox"]').prop("checked", false);
            option.removeClass('selected');
          }
        });
      }

      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       */

    }, {
      key: '_activateOption',
      value: function _activateOption(collection, newOption) {
        if (newOption) {
          if (!this.isMultiple) {
            collection.find('li.selected').removeClass('selected');
          }

          var option = $(newOption);
          option.addClass('selected');
        }
      }
    }], [{
      key: 'init',
      value: function init($els, options) {
        var arr = [];
        $els.each(function () {
          if (!$(this).hasClass('browser-default')) {
            arr.push(new Select(this, options));
          }
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
        return domElem.M_Select;
      }
    }, {
      key: 'defaults',
      get: function () {
        return _defaults;
      }
    }]);

    return Select;
  }();

  M.Select = Select;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Select, 'select', 'M_Select');
  }
})(cash);
