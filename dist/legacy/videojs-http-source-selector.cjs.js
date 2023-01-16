'use strict';

var videojs = require('video.js');

var version = "1.1.7";

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var MenuItem = videojs.getComponent('MenuItem');
var Component = videojs.getComponent('Component');

/**
 * MenuItem for changing the video source
 *
 * @returns {SourceMenuItem} Sorted array of SourceMenuItems
 */
var SourceMenuItem = /*#__PURE__*/function (_MenuItem) {
  _inheritsLoose(SourceMenuItem, _MenuItem);
  /**
   * Create SourceMenuItems and sort them
   *
   * @param {videojs.Player} player
   * A videojs player
   * @param {{label, index, selected, sortValue, selectable: true, multiSelectable: false}} options
   * Multiselectable
   */
  function SourceMenuItem(player, options) {
    options.selectable = true;
    options.multiSelectable = false;
    return _MenuItem.call(this, player, options) || this;
  }

  /**
   * Function called whenever a SourceMenuItem is clicked
   */
  var _proto = SourceMenuItem.prototype;
  _proto.handleClick = function handleClick() {
    var selected = this.options_;
    _MenuItem.prototype.handleClick.call(this);
    var levels = [].concat(this.player().qualityLevels());
    for (var _iterator = _createForOfIteratorHelperLoose(levels.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        index = _step$value[0],
        level = _step$value[1];
      level.enabled = selected.index === levels.length || selected.index === index;
    }
  }

  /**
   * Create SourceMenuItems and sort them
   */;
  _proto.update = function update() {
    var selectedIndex = this.player().qualityLevels().selectedIndex;
    this.selected(this.options_.index === selectedIndex);
  };
  return SourceMenuItem;
}(MenuItem);
Component.registerComponent('SourceMenuItem', SourceMenuItem);

var MenuButton = videojs.getComponent('MenuButton');

/**
 * A button that hides/shows sorted SourceMenuItems
 */
var SourceMenuButton = /*#__PURE__*/function (_MenuButton) {
  _inheritsLoose(SourceMenuButton, _MenuButton);
  /**
   * Create SourceMenuItems and sort them
   *
   * @param {videojs.Player} player
   * videojs player
   * @param {{default}} options
   * high | low
   */
  function SourceMenuButton(player, options) {
    var _this;
    _this = _MenuButton.call(this, player, options) || this;
    Reflect.apply(MenuButton, _assertThisInitialized(_this), arguments);
    var qualityLevels = _this.player().qualityLevels();

    // Handle options: We accept an options.default value of ( high || low )
    // This determines a bias to set initial resolution selection.
    if (options && options["default"]) {
      if (options["default"] === 'low') {
        for (var _iterator = _createForOfIteratorHelperLoose(qualityLevels.entries()), _step; !(_step = _iterator()).done;) {
          var _step$value = _step.value,
            index = _step$value[0],
            qualityLevel = _step$value[1];
          qualityLevel.enabled = index === 0;
        }
      } else if (options["default"] === 'high') {
        for (var _index = 0; _index < qualityLevels.length; _index++) {
          qualityLevels[_index].enabled = _index === qualityLevels.length - 1;
        }
      }
    }

    // Bind update to qualityLevels changes
    _this.player().qualityLevels().on(['change', 'addqualitylevel'], videojs.bind(_assertThisInitialized(_this), _this.update));
    return _this;
  }

  /**
   * Create div with videojs classes
   *
   * @returns {videojs.MenuButton} The sum of the two numbers.
   */
  var _proto = SourceMenuButton.prototype;
  _proto.createEl = function createEl() {
    return videojs.dom.createEl('div', {
      className: 'vjs-http-source-selector vjs-menu-button vjs-menu-button-popup vjs-control vjs-button'
    });
  }

  /**
   * Create SourceMenuItems and sort them
   *
   * @returns {SourceMenuItem[]} The sum of the two numbers.
   */;
  _proto.buildCSSClass = function buildCSSClass() {
    return MenuButton.prototype.buildCSSClass.call(this);
  }

  /**
   * Update the menu button
   *
   * @returns {videojs.MenuButton} The updated menu button
   */;
  _proto.update = function update() {
    return MenuButton.prototype.update.call(this);
  }

  /**
   * Create SourceMenuItems and sort them
   *
   * @returns {SourceMenuItem[]} Sorted array of SourceMenuItems
   */;
  _proto.createItems = function createItems() {
    var menuItems = [];
    var levels = this.player().qualityLevels();
    var labels = [];
    for (var index = levels.length - 1; index >= 0; index--) {
      var selected = index === levels.selectedIndex;

      // Display height if height metadata is provided with the stream, else use bitrate
      var label = "" + index;
      var sortValue = index;
      var level = levels[index];
      if (level.height) {
        label = level.height + "p";
        sortValue = Number.parseInt(level.height, 10);
      } else if (level.bitrate) {
        label = Math.floor(level.bitrate / 1e3) + " kbps";
        sortValue = Number.parseInt(level.bitrate, 10);
      }

      // Skip duplicate labels
      if (labels.includes(label)) {
        continue;
      }
      labels.push(label);
      menuItems.push(new SourceMenuItem(this.player_, {
        label: label,
        index: index,
        selected: selected,
        sortValue: sortValue
      }));
    }

    // If there are multiple quality levels, offer an 'auto' option
    if (levels.length > 1) {
      menuItems.push(new SourceMenuItem(this.player_, {
        label: 'Auto',
        index: levels.length,
        selected: false,
        sortValue: 99999
      }));
    }

    // Sort menu items by their label name with Auto always first
    menuItems.sort(function (a, b) {
      return b.options_.sortValue - a.options_.sortValue;
    });
    return menuItems;
  };
  return SourceMenuButton;
}(MenuButton);

// Default options for the plugin.
var defaults = {};
var registerPlugin = videojs.registerPlugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {videojs.Player} player
 *           A Video.js player object.
 * @param    {object} [options={}]
 *           A plain object containing options for the plugin.
 * @returns {boolean}
 *         Returns false if not using Html5 tech
 */
// eslint-disable-next-line no-unused-vars
var onPlayerReady = function onPlayerReady(player, options) {
  player.addClass('vjs-http-source-selector');
  // This plugin only supports level selection for HLS playback
  if (player.techName_ !== 'Html5') {
    console.error(player.techName_);
    return false;
  }

  /**
   *
   * We have to wait for the manifest to load before we can scan renditions for resolutions/bitrates to populate selections
   *
   */
  // eslint-disable-next-line no-unused-vars
  player.on(['loadedmetadata'], function (event) {
    // hack for plugin idempodency... prevents duplicate menubuttons from being inserted into the player if multiple player.httpSourceSelector() functions called.
    if (!player.videojsHTTPSouceSelectorInitialized) {
      player.videojsHTTPSouceSelectorInitialized = true;
      var controlBar = player.controlBar;
      var fullscreenToggle = controlBar.getChild('fullscreenToggle');
      if (fullscreenToggle) {
        controlBar.el().insertBefore(controlBar.addChild('SourceMenuButton').el(), fullscreenToggle.el());
      } else {
        controlBar.el().append(controlBar.addChild('SourceMenuButton').el());
      }
    }
  });
  return true;
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function httpSourceSelector
 * @param    {object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var httpSourceSelector = function httpSourceSelector(options) {
  var _this = this;
  this.ready(function () {
    var _videojs$obj;
    var merge = (videojs == null ? void 0 : (_videojs$obj = videojs.obj) == null ? void 0 : _videojs$obj.merge) || videojs.mergeOptions;
    onPlayerReady(_this, merge(defaults, options));
  });
  videojs.registerComponent('SourceMenuButton', SourceMenuButton);
  videojs.registerComponent('SourceMenuItem', SourceMenuItem);
};

// Register the plugin with video.js.
registerPlugin('httpSourceSelector', httpSourceSelector);

// Include the version number.
httpSourceSelector.VERSION = version;

module.exports = httpSourceSelector;