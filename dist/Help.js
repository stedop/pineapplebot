'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _sortBy2 = require('lodash/sortBy');

var _sortBy3 = _interopRequireDefault(_sortBy2);

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

var Help = function (_DiscordCommand) {
    _inherits(Help, _DiscordCommand);

    function Help() {
        _classCallCheck(this, Help);

        return _possibleConstructorReturn(this, (Help.__proto__ || Object.getPrototypeOf(Help)).apply(this, arguments));
    }

    _createClass(Help, [{
        key: 'boot',

        /**
         * Define command
         * @returns { Help }
         */
        value: function boot() {
            this.name = 'Help';
            this.syntax = 'help <command>';
            this.description = 'give the help for a command, leave blank to list all commands';
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
            var routes = this.routes;
            var cmds = {};
            if (this.suffix) {
                cmds = this.suffix.split(' ').filter(function (cmd) {
                    return routes[cmd];
                });
            } else {
                cmds = (0, _sortBy3.default)(routes, ['']);
            }

            var contents = this.__dot.helpList({ 'commands': cmds });
            this.sendBatchedMessage(contents, message);
        }

        /**
         *
         * @param contents string
         * @param msg Discord.Message
         */

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
    }]);

    return Help;
}(_DiscordCommand3.default);

exports.default = Help;
//# sourceMappingURL=Help.js.map
//# sourceMappingURL=Help.js.map
//# sourceMappingURL=Help.js.map
//# sourceMappingURL=Help.js.map
//# sourceMappingURL=Help.js.map
//# sourceMappingURL=Help.js.map