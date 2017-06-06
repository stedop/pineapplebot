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

var _Toy = require('./ToyBox/Toy');

var _Toy2 = _interopRequireDefault(_Toy);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Toybox = function () {
    function Toybox(config) {
        _classCallCheck(this, Toybox);

        this.__config = config;

        /**
         * {{}}
         */
        this.__services = {};
        this.__loadServices();
    }

    _createClass(Toybox, [{
        key: '__loadServices',
        value: function __loadServices() {
            var _this = this;

            (0, _each3.default)(this.__config.get('Services'), function (item) {
                _this.__addProvider(item);
            });
        }

        /**
         *
         * @param serviceName {string}
         * @param provides {function}
         */

    }, {
        key: 'add',
        value: function add(serviceName) {
            var provides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
                return false;
            };

            if (!this.has(serviceName)) {
                this.__services[serviceName] = provides;
                return;
            }

            throw new Error('Service ' + serviceName + ' already exists');
        }

        /**
         *
         * @param provider {Toy}
         * @private
         */

    }, {
        key: '__addProvider',
        value: function __addProvider(provider) {
            var _this2 = this;

            var providerClass = require('./ToyBox/' + provider).default;
            var providerObject = new providerClass(this, this.__config);
            providerObject.boot();
            var provides = providerObject.provides();
            (0, _each3.default)(provides, function (item, serviceName) {
                _this2.add(serviceName, item);
            });
        }

        /**
         *
         * @param serviceName
         * @returns {*}
         */

    }, {
        key: 'has',
        value: function has() {
            var serviceName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return typeof this.__services[serviceName] !== 'undefined';
        }

        /**
         *
         * @param serviceName
         * @returns {*}
         */

    }, {
        key: 'get',
        value: function get() {
            var serviceName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            if (this.has(serviceName)) {
                return this.__services[serviceName];
            }

            throw new Error('Service ' + serviceName + ' not defined');
        }
    }]);

    return Toybox;
}();

exports.default = Toybox;
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map
//# sourceMappingURL=Toybox.js.map