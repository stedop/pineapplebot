'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dot = require('dot');

var _dot2 = _interopRequireDefault(_dot);

var _DiscordCommand2 = require('./../DiscordCommand');

var _DiscordCommand3 = _interopRequireDefault(_DiscordCommand2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ping = function (_DiscordCommand) {
    _inherits(Ping, _DiscordCommand);

    function Ping() {
        _classCallCheck(this, Ping);

        return _possibleConstructorReturn(this, (Ping.__proto__ || Object.getPrototypeOf(Ping)).apply(this, arguments));
    }

    _createClass(Ping, [{
        key: 'boot',


        /**
         * Sets up command
         *
         * @returns {Ping}
         */
        value: function boot() {
            this.name = 'Ping';
            this.syntax = 'ping';
            this.description = 'responds pong, useful for checking if bot is alive';
            return this;
        }

        /**
         *
         * @param message { Discord.message }
         * @param params { {} }
         */

    }, {
        key: 'process',
        value: function process(message, params) {
            message.channel.sendMessage(message.author + ' pong!').catch(function (error) {
                throw error;
            });
            if (this.suffix) {
                message.channel.sendMessage('note that !ping takes no arguments!').catch(function (error) {
                    throw error;
                });
            }
        }
    }]);

    return Ping;
}(_DiscordCommand3.default);

exports.default = Ping;
//# sourceMappingURL=Ping.js.map