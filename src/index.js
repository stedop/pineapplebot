'use strict';

import Config from 'config';
import PineappleBot from './PineappleBot';

let options = Config.get('Bot');

try {
    const pineAppleBot = new PineappleBot(options);
    pineAppleBot.go();
    console.log('Going');
} catch ( error ) {
    console.log('error', error.stack);
}