'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

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

var Where = function (_DiscordCommand) {
    _inherits(Where, _DiscordCommand);

    function Where() {
        _classCallCheck(this, Where);

        return _possibleConstructorReturn(this, (Where.__proto__ || Object.getPrototypeOf(Where)).apply(this, arguments));
    }

    _createClass(Where, [{
        key: 'boot',

        /**
         * Define command
         * @returns { Where }
         */
        value: function boot() {
            this.name = 'Where';
            this.syntax = 'where <username> ';
            this.description = 'will tell you if this user is registered on the map and tell you their location';
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
            var username = this.suffix;
            if (username) {
                _axios2.default.get('https://www.zeemaps.com/emarkers?g=2551174&k=REGULAR&e=false&_dc=0.6138917768604712').then(function (response) {
                    var location = (0, _filter3.default)(response.data, { 'nm': username })[0];
                    if (location) {
                        message.channel.sendMessage(message.author + ' ' + username + ' is in ' + location.city);
                    } else {
                        message.channel.sendMessage(message.author + ' ' + username + ' not found on the map');
                    }
                }, function (error) {
                    throw error;
                });
            } else {
                message.channel.sendMessage(message.author + ' I need a name to search for eg. !where pineapplebot');
            }
        }
    }]);

    return Where;
}(_DiscordCommand3.default);

exports.default = Where;
//# sourceMappingURL=Where.js.map
//# sourceMappingURL=Where.js.map
//# sourceMappingURL=Where.js.map
//# sourceMappingURL=Where.js.map
//# sourceMappingURL=Where.js.map
//# sourceMappingURL=Where.js.map
//# sourceMappingURL=Where.js.map
//# sourceMappingURL=Where.js.map