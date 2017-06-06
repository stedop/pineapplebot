'use strict';

import Config from 'config';
import PineappleBot from './PineappleBot';

try {
    const pineAppleBot = new PineappleBot(Config);
    pineAppleBot.go();
} catch ( error ) {
    console.log('error', error.stack);
}