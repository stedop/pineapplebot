'use strict';

import Config from 'config';
import winston from 'winston';
import PineappleBot from './PineappleBot';

/**
 * @constant {winston.Logger} narc
 */
const narc = new winston.Logger(
    {
        level: 'error',
        transports: [
            new (winston.transports.File)( { filename: Config.get( 'Log.file' ) } )
        ]
    }
);

if (Config.get( 'Debug' ) === true) {
    narc.configure({
        level: 'debug',
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)( { filename: Config.get( 'Log.file' ) } ),

        ]
    });
}

try {
    const pineappleBot = new PineappleBot( Config, narc );
    pineappleBot.go();
} catch ( error ) {
    narc.log( 'error', error.message, error.stack );
}