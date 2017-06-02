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

var _Toy2 = require('./Toy');

var _Toy3 = _interopRequireDefault(_Toy2);

var _discord = require('discord.js');

var _DiscordRouter = require('./../DiscordRouter');

var _DiscordRouter2 = _interopRequireDefault(_DiscordRouter);

var _Help = require('./../Discord/Help');

var _Help2 = _interopRequireDefault(_Help);

var _Ping = require('./../Discord/Ping');

var _Ping2 = _interopRequireDefault(_Ping);

var _Top = require('./../Discord/Top');

var _Top2 = _interopRequireDefault(_Top);

var _Where = require('./../Discord/Where');

var _Where2 = _interopRequireDefault(_Where);

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

var Discord = function (_Toy) {
    _inherits(Discord, _Toy);

    function Discord() {
        _classCallCheck(this, Discord);

        return _possibleConstructorReturn(this, (Discord.__proto__ || Object.getPrototypeOf(Discord)).apply(this, arguments));
    }

    _createClass(Discord, [{
        key: 'boot',
        value: function boot() {
            var _this2 = this;

            /**
             *
             * @type {{}}
             */
            this.discordCommands = {
                'help': _Help2.default,
                'ping': _Ping2.default,
                'top': _Top2.default,
                'where': _Where2.default
            };

            /**
             *
             * @type {Client}
             * @private
             */
            this.__discord = new _discord.Client({
                ws: {
                    compress: true
                }
            });

            /**
             *
             * @type {DiscordRouter}
             * @private
             */
            this.__router = this.setupRouter();

            this.__discord.on('ready', function () {
                console.log('Logged in to discord!');
                _this2.__discord.user.setGame(_this2.commandPrefix + 'help').catch(function (error) {
                    throw error;
                });
            });
            this.__discord.on('message', function (msg) {
                return _this2.handleMessage(msg);
            });
            this.__discord.on('messageUpdate', function (oldMessage, newMessage) {
                return _this2.handleMessage(newMessage);
            });
            this.__discord.on('disconnected', function () {
                console.log('Disconnected!');
                process.exit(1); //exit node.js with an error
            });
        }

        /**
         * @returns {{}}
         */

    }, {
        key: 'provides',
        value: function provides() {

            return {
                'discord': this.__discord,
                'router': this.__router
            };
        }

        /**
         *
         * @returns {DiscordRouter}
         */

    }, {
        key: 'setupRouter',
        value: function setupRouter() {
            return new _DiscordRouter2.default(this.discordCommands, this.__discord, this.__toybox.get('dot'), this.__toybox.get('reddit'), this.__config);
        }

        /**
         *
         * @param msg { Discord.Message }
         * @returns {*}
         */

    }, {
        key: 'handleMessage',
        value: function handleMessage(msg) {
            try {
                if (msg.author !== this.__discord.user) {
                    var cmd = this.__router.checkMessagesForCommand(msg);

                    if (cmd !== false) {
                        return cmd.process(msg, { subreddit: this.subreddit });
                    }

                    if (msg.content.substring(0, this.commandPrefix.length) === this.commandPrefix) {
                        msg.channel.sendMessage('Not recognized as a command! Try ' + this.commandPrefix + 'help').then(function (message) {
                            return message.delete(5000);
                        });
                    }
                }

                return false;
            } catch (e) {
                var msgTxt = 'fail! :(';
                if (this.debug) {
                    msgTxt += '\n' + e.stack;
                }
                msg.channel.sendMessage(msgTxt);
                throw e;
            }
        }
    }]);

    return Discord;
}(_Toy3.default);

exports.default = Discord;
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map
//# sourceMappingURL=Discord.js.map