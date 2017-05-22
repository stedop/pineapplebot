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

var _DiscordCommand2 = require('./../DiscordCommand');

var _DiscordCommand3 = _interopRequireDefault(_DiscordCommand2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TopTen = function (_DiscordCommand) {
    _inherits(TopTen, _DiscordCommand);

    function TopTen() {
        _classCallCheck(this, TopTen);

        return _possibleConstructorReturn(this, (TopTen.__proto__ || Object.getPrototypeOf(TopTen)).apply(this, arguments));
    }

    _createClass(TopTen, [{
        key: 'boot',

        /**
         * Define command
         * @returns { TopTen }
         */
        value: function boot() {
            this.name = 'TopTen';
            this.syntax = 'topten';
            this.description = 'lists the topten posts in uktrees';
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
            var _this2 = this;

            this.__reddit.getSubreddit(params.subreddit).getHot().then(function (response) {
                _this2.sendBatchedMessage(_this2.__dot.topTen({ 'listings': response.slice(0, 10) }), message);
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
}(_DiscordCommand3.default);

exports.default = TopTen;
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map
//# sourceMappingURL=TopTen.js.map