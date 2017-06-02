'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _snoowrap = require('snoowrap');

var _snoowrap2 = _interopRequireDefault(_snoowrap);

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _dot = require('dot');

var _dot2 = _interopRequireDefault(_dot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import DateFormat from 'dateformat';


var bot = function () {

    /**
     * @summary initialises the bot
     *
     * @param {Config} config
     */
    function bot(config) {
        _classCallCheck(this, bot);

        if (typeof config !== 'Config') {
            throw new Error('need a proper __config thanks knobcheese');
        }

        /**
         *
         * @type {Config}
         */
        this.__config = config;

        /**
         * The reddit client
         *
         * @type {Snoowrap}
         */
        this.__reddit = this.__initRedditClient();

        /**
         * The discord client
         *
         * @type {Discord.client}
         */
        this.__discord = this.__initDiscordClient();

        /**
         * The template engine
         *
         * @type {Dot}
         * @private
         */
        this.__dot = this.__initTemplateEngine();

        /**
         * @type {DiscordRouter}
         * @priate
         */
        this.__router = this.__initDiscordRouter();

        this.__initBotEvents();
    }

    /**
     * Sets up snoowrap
     *
     * @returns Snoowrap
     * @private
     */


    _createClass(bot, [{
        key: '__initRedditClient',
        value: function __initRedditClient() {
            return new _snoowrap2.default({
                userAgent: this.userAgent,
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                refreshToken: this.refreshToken
            });
        }

        /**
         * Sets up discord
         *
         * @returns Discord.client
         * @private
         */

    }, {
        key: '__initDiscordClient',
        value: function __initDiscordClient() {
            return new _discord2.default.Client({
                ws: {
                    compress: true
                }
            });
        }

        /**
         * Sets up the Dot template engine
         *
         * @returns Dot
         * @private
         * @static
         */

    }, {
        key: '__initTemplateEngine',
        value: function __initTemplateEngine() {
            return _dot2.default.process({ templateSettings: { strip: false }, path: 'views/' });
        }
    }, {
        key: '__initDiscordRouter',
        value: function __initDiscordRouter() {
            return new DiscordRouter(this.discordCommands, this.__discord, this.__dot, this.__reddit);
        }

        /**
         * Sets up the bot events
         *
         * @private
         */

    }, {
        key: '__initBotEvents',
        value: function __initBotEvents() {
            var _this = this;

            this.__discord.on('ready', function () {
                console.log('Logged in to discord!');
                _this.__discord.user.setGame(_this.commandPrefix + 'help').catch(function (error) {
                    throw error;
                });
            });
            this.__discord.on('message', function (msg) {
                return _this.handleMessage(msg);
            });
            this.__discord.on('messageUpdate', function (oldMessage, newMessage) {
                return _this.handleMessage(newMessage);
            });
            this.__discord.on('disconnected', function () {
                console.log('Disconnected!');
                process.exit(1); //exit node.js with an error
            });
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

        /**
         *
         */

    }, {
        key: 'go',
        value: function go() {
            this.__discord.login(this.discordToken).then(function (respsonse) {
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