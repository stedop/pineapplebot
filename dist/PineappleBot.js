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

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _Toybox = require('./Toybox');

var _Toybox2 = _interopRequireDefault(_Toybox);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var bot = function () {

    /**
     * @summary initialises the bot
     *
     * @param {Config} config
     */
    function bot(config) {
        _classCallCheck(this, bot);

        /**
         *
         * @type {Config}
         */
        this.__config = config;

        /**
         *
         * @type {ToyBox}
         */
        this.__toybox = new _Toybox2.default(config);
    }

    /**
     *
     */

    _createClass(bot, [{
        key: 'go',
        value: function go() {
            var discord = this.__toybox.get('discord');
            discord.login(this.discordToken).then(function (respsonse) {
                console.log('response', respsonse);
            }).catch(function (error) {
                throw error;
            });
        }
    }]);

    return bot;
}();

exports.default = bot;
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map