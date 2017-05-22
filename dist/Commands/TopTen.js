'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

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

var TopTen = function () {

    /**
     * Sets up command
     *
     * @returns {TopTen}
     */
    function TopTen() {
        _classCallCheck(this, TopTen);

        this.name = 'TopTen';
        this.syntax = 'topten';
        this.description = 'lists the topten posts in uktrees';
        return this;
    }

    /**
     * todo work out babel extends and move this to the command class
     * @param discord { Discord.Client }
     * @param dot { Dot }
     * @param reddit { Snoowrap }
     * @returns { TopTen }
     */

    _createClass(TopTen, [{
        key: 'boot',
        value: function boot(discord, dot, reddit) {
            this.__discord = discord;
            this.__dot = dot;
            this.__reddit = reddit;
            return this;
        }

        /**
         *
         * @param message { Discord.Message }
         * @param params {{}}
         * @param isEdit { boolean }
         */

    }, {
        key: 'process',
        value: function process(message, params, isEdit) {
            var _this = this;

            this.__reddit.getSubreddit(params.subreddit).getHot().then(function (response) {
                _this.sendBatchedMessage(_this.__dot.topTen({ 'listings': response.slice(0, 10) }), message);
            });

            if (params.suffix) {
                message.channel.sendMessage('note that !topten takes no arguments!').catch(function (error) {
                    throw error;
                });
            }
        }

        /**
         *
         * @param contents {string}
         * @param msg {Discord.Message}
         */

    }, {
        key: 'sendBatchedMessage',
        value: function sendBatchedMessage(contents, msg) {
            var batches = contents.match(/.{1,1016}/g);

            (0, _each3.default)(batches, function (batch) {
                msg.channel.sendMessage(batch).catch(function (error) {
                    throw error;
                });
            });
        }
    }]);

    return TopTen;
}();

exports.default = TopTen;
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map