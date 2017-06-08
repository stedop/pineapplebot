'use strict';

import { each, sortBy } from 'lodash';

export default class DiscordRouter {

    /**
     *
     * @param routes {}
     * @param discord {Client}
     * @param toybox {Toybox}
     * @param config {Config}
     *
     * @returns {DiscordRouter}
     */
    constructor( routes, discord, toybox, config ) {
        /**
         *
         * @type {Client}
         * @private
         */
        this.__discord = discord;

        /**
         *
         * @type {Toybox}
         * @private
         */
        this.__toybox = toybox;

        /**
         *
         * @type {{}}
         * @private
         */
        this.__routes = {};

        /**
         *
         * @type {string}
         * @private
         */
        this.__commandPrefix = config.get( 'Discord.commandPrefix' );


        /**
         *
         * @type {Config}
         * @private
         */
        this.__config = config;

        this.parseRoutes( routes );

        return this;
    }

    /**
     *
     * @param routes {DiscordCommand}
     */
    parseRoutes( routes ) {
        each( routes, ( route ) => {
            route = new route( this.__discord, this.__toybox ).boot();
            let key = route.name.toLowerCase();
            this.__routes[ key ] = route;
        } );
    }

    /**
     *
     * @returns {{}|*}
     */
    getRoutes() {
        return this.__routes;
    }

    /**
     *
     * @param msg Discord.Message
     * @returns {boolean}
     */
    isCommand( msg ) {
        return ( msg.content.startsWith( this.__commandPrefix ) );
    }

    /**
     *
     * @param msg Discord.Message
     */
    checkMessagesForCommand( msg ) {
        //check if message is a command
        if ( this.isCommand( msg ) === true ) {
            return this.match( msg );
        }

        if ( msg.isMentioned( this.__discord.user ) ) {
            msg.channel.sendMessage( msg.author + ', you called?' );
        }

        return false;
    }

    /**
     *
     * @param msg Discord.Message
     */
    match( msg ) {
        let routeName = msg.content.split( ' ' )[ 0 ].substring( this.__commandPrefix.length );
        let params = msg.content.substring( routeName.length + this.__commandPrefix.length + 1 );//add one for the ! and one for the space

        if ( msg.isMentioned( this.__discord.user ) ) {
            try {
                routeName = msg.content.split( ' ' )[ 1 ];
                params = msg.content.substring(
                    this.__discord.user.mention().length + routeName.length + this.__commandPrefix.length + 1
                );
            } catch ( e ) { //no command
                msg.channel.sendMessage( 'Yes?' );
                return false;
            }
        }

        let cmd = this.__routes[ routeName ];

        if ( cmd ) {
            cmd.suffix = params;
            cmd.routes = this.getRoutes();
            return cmd;
        }

        return false;
    }
}