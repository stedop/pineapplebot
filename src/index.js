'use strict';

import Config from 'config';
import winston from 'winston';
import PineappleBot from './PineappleBot';

const config = Config;
const narc = new winston.Logger(
    {
        level: (config.get('Debug') === true) ? 'debug' : 'info',
        transports: [
            new (winston.transports.File)({ filename: config.get('Log.file') })
        ]
    }
);

try {
    const pineAppleBot = new PineappleBot(config, narc);
    pineAppleBot.go();
} catch ( error ) {
    narc.log('error', error.message, error.stack);
}