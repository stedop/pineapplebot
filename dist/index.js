'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _PineappleBot = require('./PineappleBot');

var _PineappleBot2 = _interopRequireDefault(_PineappleBot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = _config2.default.get('Bot');

try {
    var pineAppleBot = new _PineappleBot2.default(options);
    pineAppleBot.go();
} catch (error) {
    console.log('error', error.stack);
}
//# sourceMappingURL=index.js.map