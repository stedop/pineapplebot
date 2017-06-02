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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var DiscordRouter = function () {

    /**
     *
     * @param routes {}
     * @param discord {Discord.client}
     * @param dot {Dot}
     * @param reddit {Snoowrap}
     * @param commandPrefix {string}
     * @returns {DiscordRouter}
     */
    function DiscordRouter(routes, discord, dot, reddit) {
        var commandPrefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '!';

        _classCallCheck(this, DiscordRouter);

        /**
         *
         * @type {Discord.client}
         * @private
         */
        this.__discord = discord;

        /**
         *
         * @type {Dot}
         * @private
         */
        this.__dot = dot;

        /**
         *
         * @type {Snoowrap}
         * @private
         */
        this.__reddit = reddit;

        /**
         *
         * @type {{}}
         * @private
         */
        this.__routes = {};

        /**
         *
         * @type {string}
         * @private
         */
        this.__commandPrefix = commandPrefix;

        this.parseRoutes(routes);

        return this;
    }

    /**
     *
     * @param routes {DiscordCommand}
     */

    _createClass(DiscordRouter, [{
        key: 'parseRoutes',
        value: function parseRoutes(routes) {
            var _this = this;

            (0, _each3.default)(routes, function (route) {
                route = new route(_this.__discord, _this.__dot, _this.__reddit).boot();
                var key = route.name.toLowerCase();
                _this.__routes[key] = route;
            });
        }

        /**
         *
         * @returns {{}|*}
         */

    }, {
        key: 'getRoutes',
        value: function getRoutes() {
            return this.__routes;
        }

        /**
         * 
         * @param msg Discord.Message
         * @returns {boolean}
         */

    }, {
        key: 'isCommand',
        value: function isCommand(msg) {
            return msg.content.startsWith(this.__commandPrefix);
        }

        /**
         *
         * @param msg Discord.Message
         */

    }, {
        key: 'checkMessagesForCommand',
        value: function checkMessagesForCommand(msg) {
            //check if message is a command
            if (this.isCommand(msg) === true) {
                return this.match(msg);
            }

            if (msg.isMentioned(this.__discord.user)) {
                msg.channel.sendMessage(msg.author + ', you called?');
            }

            return false;
        }

        /**
         *
         * @param msg Discord.Message
         */

    }, {
        key: 'match',
        value: function match(msg) {
            var routeName = msg.content.split(' ')[0].substring(this.__commandPrefix.length);
            var params = msg.content.substring(routeName.length + this.__commandPrefix.length + 1); //add one for the ! and one for the space

            if (msg.isMentioned(this.__discord.user)) {
                try {
                    routeName = msg.content.split(' ')[1];
                    params = msg.content.substring(this.__discord.user.mention().length + routeName.length + this.__commandPrefix.length + 1);
                } catch (e) {
                    //no command
                    msg.channel.sendMessage('Yes?');
                    return false;
                }
            }

            var cmd = this.__routes[routeName];

            if (cmd) {
                cmd.suffix = params;
                cmd.routes = this.getRoutes();
                return cmd;
            }

            return false;
        }
    }]);

    return DiscordRouter;
}();

exports.default = DiscordRouter;
//# sourceMappingURL=DiscordRouter.js.map
//# sourceMappingURL=DiscordRouter.js.map
//# sourceMappingURL=DiscordRouter.js.map
//# sourceMappingURL=DiscordRouter.js.map
//# sourceMappingURL=DiscordRouter.js.map
//# sourceMappingURL=DiscordRouter.js.map
//# sourceMappingURL=DiscordRouter.js.map
//# sourceMappingURL=DiscordRouter.js.map
//# sourceMappingURL=DiscordRouter.js.map
//# sourceMappingURL=DiscordRouter.js.map