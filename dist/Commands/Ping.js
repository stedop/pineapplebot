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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Ping = function () {

    /**
     * Sets up command
     *
     * @returns {Ping}
     */
    function Ping() {
        _classCallCheck(this, Ping);

        this.name = 'Ping';
        this.syntax = 'ping';
        this.description = 'responds pong, useful for checking if bot is alive';
        return this;
    }

    /**
     * todo work out babel extends and move this to the command class
     * @param discord { Discord.Client }
     * @param dot { Dot }
     * @param reddit { Snoowrap }
     * @returns { TopTen }
     */

    _createClass(Ping, [{
        key: 'boot',
        value: function boot(discord, dot, reddit) {
            this.__discord = discord;
            this.__dot = dot;
            this.__reddit = reddit;
            return this;
        }

        /**
         *
         * @param message { Discord.message }
         * @param params { {} }
         * @param isEdit { boolean }
         */

    }, {
        key: 'process',
        value: function process(message, params, isEdit) {
            message.channel.sendMessage(message.author + ' pong!').catch(function (error) {
                throw error;
            });
            if (params.suffix) {
                message.channel.sendMessage('note that !ping takes no arguments!').catch(function (error) {
                    throw error;
                });
            }
        }
    }]);

    return Ping;
}();

exports.default = Ping;
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map
//# sourceMappingURL=Ping.js.map