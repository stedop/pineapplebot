'use strict';

import Config from 'config';
import ToyBox from './Toybox';

export default class bot {

    /**
     * @summary initialises the bot
     *
     * @param {Config} config
     */
    constructor( config ) {

        /**
         *
         * @type {Config}
         */
        this.__config = config;

        /**
         *
         * @type {ToyBox}
         */
        this.__toybox = new ToyBox(config);
    }

    /**
     *
     */
    go() {
        let discord = this.__toybox.get('discord');
        discord.login( this.discordToken )
            .then( ( respsonse ) => {
                console.log( 'response', respsonse );
            } )
            .catch( ( error ) => {
                throw error;
            } );
    }
}