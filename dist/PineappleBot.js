'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defaults2 = require('lodash/defaults');

var _defaults3 = _interopRequireDefault(_defaults2);

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();
//import DateFormat from 'dateformat';


var _snoowrap = require('snoowrap');

var _snoowrap2 = _interopRequireDefault(_snoowrap);

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _dot = require('dot');

var _dot2 = _interopRequireDefault(_dot);

var _DiscordRouter = require('./DiscordRouter');

var _DiscordRouter2 = _interopRequireDefault(_DiscordRouter);

var _Help = require('./Discord/Help');

var _Help2 = _interopRequireDefault(_Help);

var _Ping = require('./Discord/Ping');

var _Ping2 = _interopRequireDefault(_Ping);

var _Top = require('./Discord/Top');

var _Top2 = _interopRequireDefault(_Top);

var _Where = require('./Discord/Where');

var _Where2 = _interopRequireDefault(_Where);

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
     * @param {string} [userAgent] A unique description of what your app does. This argument is not necessary when Snoowrap
     is running in a browser.
     * @param {string} [clientId] The client ID of your app (assigned by reddit)
     * @param {string} [clientSecret] The client secret of your app (assigned by reddit). If you are using a refresh token
     with an installed app (which does not have a client secret), pass an empty string as your `clientSecret`.
     * @param {string} [refreshToken] A refresh token for your app.
     * @param {string} [subreddit] The subreddit name we are going to be managing
     * @param {string} [discordToken] Key for the stats api
     * @param {string} [discordServer] The server to work in discord
     * @param {string} [commandPrefix] The command prefix
     */
    function bot() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            userAgent = _ref.userAgent,
            clientId = _ref.clientId,
            clientSecret = _ref.clientSecret,
            refreshToken = _ref.refreshToken,
            subreddit = _ref.subreddit,
            discordToken = _ref.discordToken,
            discordServer = _ref.discordServer,
            commandPrefix = _ref.commandPrefix;

        _classCallCheck(this, bot);

        if (clientId === undefined || clientSecret === undefined || refreshToken === undefined) {
            throw new Error('Reddit Credentials not supplied, fuckwit');
        }

        if (discordToken === undefined) {
            throw new Error('Discord Token needed, dickhead');
        }

        (0, _defaults3.default)(this, {
            userAgent,
            clientId,
            clientSecret,
            refreshToken,
            subreddit,
            discordToken,
            discordServer,
            commandPrefix
        }, {
            userAgent: null,
            clientId: null,
            clientSecret: null,
            refreshToken: null,
            subbreddit: 'uktrees',
            discordToken: null,
            discordServer: '#uktrees',
            commandPrefix: '!'
        });

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
            return new _DiscordRouter2.default(this.discordCommands, this.__discord, this.__dot, this.__reddit);
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
                console.log('Logged in!');
                console.log('type ' + _this.commandPrefix + 'help in Discord for a this.discordCommands list.');
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
    }, {
        key: 'handleMessage',
        value: function handleMessage(msg) {
            try {
                if (msg.author !== this.__discord.user) {
                    var cmd = this.__router.checkMessagesForCommand(msg);

                    if (cmd !== false) {
                        return cmd.process(msg, { subreddit: this.subreddit });
                    }

                    msg.channel.sendMessage('Not recognized as a command! Try ' + this.commandPrefix + 'help').then(function (message) {
                        return message.delete(5000);
                    });
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