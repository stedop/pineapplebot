'use strict';

import Config from 'config';
import winston from 'winston';
import PineappleBot from './PineappleBot';

try {
    const narc = new winston.Logger(
        {
            level: (Config.get('Debug') === true) ? 'debug' : 'info',
            transports: [
                new (winston.transports.File)({ filename: Config.get('Log.file') })
            ]
        }
    );
    const pineAppleBot = new PineappleBot(Config, narc);
    pineAppleBot.go();
} catch ( error ) {
    console.log('error', error.stack);
}