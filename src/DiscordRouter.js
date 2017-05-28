'use strict';

import { each, sortBy } from 'lodash';

export default class DiscordRouter {

    /**
     *
     * @param routes {}
     * @param discord {Discord.client}
     * @param dot {Dot}
     * @param reddit {Snoowrap}
     * @param commandPrefix {string}
     * @returns {DiscordRouter}
     */
    constructor( routes,  discord, dot, reddit, commandPrefix = '!') {
        /**
         *
         * @type {Discord.client}
         * @private
         */
        this.__discord = discord;

        /**
         *
         * @type {Dot}
         * @private
         */
        this.__dot = dot;

        /**
         *
         * @type {Snoowrap}
         * @private
         */
        this.__reddit = reddit;

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
        this.__commandPrefix = commandPrefix;

        this.parseRoutes(routes);

        return this;
    }

    /**
     *
     * @param routes {DiscordCommand}
     */
    parseRoutes(routes) {
        each(routes, (route) => {
            route = new route(this.__discord, this.__dot, this.__reddit).boot();
            let key = route.name.toLowerCase();
            this.__routes[key] = route;
        });
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
    isCommand(msg) {
        return ( msg.content.startsWith( this.__commandPrefix ) );
    }

    /**
     *
     * @param msg Discord.Message
     */
    checkMessagesForCommand( msg) {
        //check if message is a command
        if ( this.isCommand(msg) === true ) {
            return this.match(msg);
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
    match(msg) {
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

        // todo because of this change I've made I think help can be it's own command
        if ( routeName === 'help' ) {
            this.helpCommand( params, msg );
        }

        let cmd = this.__routes[ routeName ];

        if ( cmd) {
            cmd.suffix = params;
            return cmd;
        }

        return false;
    }

    /**
     * Run the help command
     * @param suffix
     * @param msg Disco
     */
    helpCommand( suffix, msg ) {
        let routes = this.__routes;
        let cmds = {};
        if ( suffix ) {
            cmds = suffix.split( ' ' ).filter( function ( cmd ) {
                return routes[ cmd ];
            } );
        } else {
            cmds = sortBy( routes, [ '' ] );
        }

        let contents = this.__dot.helpList( { 'commands': cmds } );
        this.sendBatchedMessage(contents, msg);

    }

    /**
     *
     * @param contents string
     * @param msg Discord.Message
     */
    sendBatchedMessage(contents, msg) {
        let batches = contents.match(/.{1,1016}/g);

        each(batches, (batch) => {
            msg.author.sendMessage( batch ).catch( ( error ) => {
                throw(error);
            } );
        });
    }
}