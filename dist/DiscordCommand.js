'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dot = require('dot');

var _dot2 = _interopRequireDefault(_dot);

var _snoowrap = require('snoowrap');

var _snoowrap2 = _interopRequireDefault(_snoowrap);

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var DiscordCommand = function () {

  /**
   * Sets up command
   *
   * @param discord { Discord.Client }
   * @param dot { Dot }
   * @param reddit { Snoowrap }
   *
   * @returns {DiscordCommand}
   */
  function DiscordCommand(discord, dot, reddit) {
    _classCallCheck(this, DiscordCommand);

    this.__discord = discord;
    this.__dot = dot;
    this.__reddit = reddit;

    return this;
  }

  _createClass(DiscordCommand, [{
    key: 'boot',
    value: function boot() {}

    /**
     * Handles the command
     */

  }, {
    key: 'process',
    value: function process() {}
  }]);

  return DiscordCommand;
}();

exports.default = DiscordCommand;
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map
//# sourceMappingURL=DiscordCommand.js.map