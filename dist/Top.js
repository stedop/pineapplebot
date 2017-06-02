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

var _discord = require('discord.js');

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

var Top = function (_DiscordCommand) {
    _inherits(Top, _DiscordCommand);

    function Top() {
        _classCallCheck(this, Top);

        return _possibleConstructorReturn(this, (Top.__proto__ || Object.getPrototypeOf(Top)).apply(this, arguments));
    }

    _createClass(Top, [{
        key: 'boot',

        /**
         * Define command
         * @returns { Top }
         */
        value: function boot() {
            this.name = 'Top';
            this.syntax = 'top <number of posts> ';
            this.description = 'lists the top n posts in uktrees, maximum of 10';
            return this;
        }

        /**
         *
         * @param message { Message }
         * @param params {{}}
         */

    }, {
        key: 'process',
        value: function process(message, params) {
            var _this2 = this;

            console.log('suffix', this.suffix);
            var n = 5;
            if (this.suffix) {
                n = parseInt(this.suffix);
            }
            this.__reddit.getSubreddit(params.subreddit).getHot().then(function (response) {
                _this2.sendBatchedMessage(_this2.__dot.top({ 'number': n, 'listings': response.slice(0, n) }), message);
            });
        }

        /**
         *
         * @param contents {string}
         * @param msg {Message}
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

    return Top;
}(_DiscordCommand3.default);

exports.default = Top;
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map
//# sourceMappingURL=Top.js.map