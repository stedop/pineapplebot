'use strict';

/**
 * @import Config from 'config';
 * @import Logger from 'winston';
 */

import ToyBox from './Toybox';

export default class bot {

    /**
     * @summary initialises the bot
     *
     * @param {Config} config
     * @param {Logger} narc
     */
    constructor( config, narc ) {

        /**
         *
         * @type {Config}
         */
        this.__config = config;

        /**
         *
         * @type {ToyBox}
         */
        this.__toybox = new ToyBox(config, narc);

        /**
         *
         * @type {Logger}
         * @private
         */
        this.__narc = narc;
    }

    /**
     *
     */
    go() {
        let discord = this.__toybox.get('discord');
        discord.login( this.__config.get('Discord.discordToken') )
            .then( ( response ) => {
                this.__narc.log( 'response', response );
            } )
            .catch( ( error ) => {
                throw error;
            } );
    }
}