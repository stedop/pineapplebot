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

var _snoowrap = require('snoowrap');

var _snoowrap2 = _interopRequireDefault(_snoowrap);

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

var Reddit = function (_Toy) {
    _inherits(Reddit, _Toy);

    function Reddit() {
        _classCallCheck(this, Reddit);

        return _possibleConstructorReturn(this, (Reddit.__proto__ || Object.getPrototypeOf(Reddit)).apply(this, arguments));
    }

    _createClass(Reddit, [{
        key: 'provides',
        value: function provides() {
            return {
                'reddit': new _snoowrap2.default({
                    userAgent: this.__config.get('Reddit.userAgent'),
                    clientId: this.__config.get('Reddit.clientId'),
                    clientSecret: this.__config.get('Reddit.clientSecret'),
                    refreshToken: this.__config.get('Reddit.refreshToken')
                })
            };
        }
    }]);

    return Reddit;
}(_Toy3.default);

exports.default = Reddit;
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map
//# sourceMappingURL=Reddit.js.map