'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sortBy2 = require('lodash/sortBy');

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

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

var _Ping = require('./Commands/Ping');

var _Ping2 = _interopRequireDefault(_Ping);

var _TopTen = require('./Commands/TopTen');

var _TopTen2 = _interopRequireDefault(_TopTen);

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
         * @type {{ping: Command}}
         */
        this.discordCommands = {
            'ping': new _Ping2.default().boot(this.__discord, this.__dot, this.__reddit),
            'topten': new _TopTen2.default().boot(this.__discord, this.__dot, this.__reddit)
        };

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
                _this.checkMessagesForCommand(msg, false);
            });
            this.__discord.on('messageUpdate', function (oldMessage, newMessage) {
                _this.checkMessagesForCommand(newMessage, true);
            });
        }

        /**
         *
         * @param msg
         * @param isEdit
         */

    }, {
        key: 'checkMessagesForCommand',
        value: function checkMessagesForCommand(msg, isEdit) {
            //check if message is a command
            if (msg.author.id !== this.__discord.user.id && msg.content.startsWith(this.commandPrefix)) {
                console.log('treating ' + msg.content + ' from ' + msg.author + ' as command');
                var cmdTxt = msg.content.split(' ')[0].substring(this.commandPrefix.length);
                var suffix = msg.content.substring(cmdTxt.length + this.commandPrefix.length + 1); //add one for the ! and one for the space
                if (msg.isMentioned(this.__discord.user)) {
                    try {
                        cmdTxt = msg.content.split(' ')[1];
                        suffix = msg.content.substring(this.__discord.user.mention().length + cmdTxt.length + this.commandPrefix.length + 1);
                    } catch (e) {
                        //no command
                        msg.channel.sendMessage('Yes?');
                        return;
                    }
                }

                var cmd = this.discordCommands[cmdTxt];

                if (cmdTxt === 'help') {
                    //help is special since it iterates over the other this.discordCommands
                    this.helpCommand(suffix, msg);
                } else if (cmd) {

                    try {
                        cmd.process(msg, { subreddit: this.subreddit, suffix: suffix }, isEdit);
                    } catch (e) {
                        var msgTxt = 'command ' + cmdTxt + ' failed :(';
                        if (this.debug) {
                            msgTxt += '\n' + e.stack;
                        }
                        msg.channel.sendMessage(msgTxt);
                        throw e;
                    }
                } else {
                    msg.channel.sendMessage(cmdTxt + ' not recognized as a command!').then(function (message) {
                        return message.delete(5000);
                    });
                }
            } else {
                //message isn't a command or is from us
                //drop our own messages to prevent feedback loops
                if (msg.author === this.__discord.user) {
                    return;
                }

                if (msg.author !== this.__discord.user && msg.isMentioned(this.__discord.user)) {
                    msg.channel.sendMessage(msg.author + ', you called?');
                }
            }
        }

        /**
         * Rund the help comand
         * @param suffix
         * @param msg Disco
         */

    }, {
        key: 'helpCommand',
        value: function helpCommand(suffix, msg) {
            var commands = this.discordCommands;
            var cmds = {};
            if (suffix) {
                cmds = suffix.split(' ').filter(function (cmd) {
                    return commands[cmd];
                });
            } else {
                cmds = (0, _sortBy3.default)(commands, ['']);
            }

            var contents = this.__dot.helpList({ 'commands': cmds });
            this.sendBatchedMessage(contents, msg);
        }
    }, {
        key: 'sendBatchedMessage',
        value: function sendBatchedMessage(contents, msg) {
            var batches = contents.match(/.{1,1016}/g);

            (0, _each3.default)(batches, function (batch) {
                msg.author.sendMessage(batch).catch(function (error) {
                    throw error;
                });
            });
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
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map
//# sourceMappingURL=PineappleBot.js.map