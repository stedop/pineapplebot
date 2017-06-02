'use strict';

import Config from 'config';
import Snoowrap from 'snoowrap';
import Discord from 'discord.js';
import Dot from 'dot';
//import DateFormat from 'dateformat';


export default class bot {

    /**
     * @summary initialises the bot
     *
     * @param {Config} config
     */
    constructor( config ) {

        if (typeof config !== 'Config') {
            throw new Error('need a proper __config thanks knobcheese');
        }

        /**
         *
         * @type {Config}
         */
        this.__config = config;

        /**
         * The reddit client
         *
         * @type {Snoowrap}
         */
        this.__reddit = this.__initRedditClient();

        /**
         * The discord client
         *
         * @type {Discord.client}
         */
        this.__discord = this.__initDiscordClient();

        /**
         * The template engine
         *
         * @type {Dot}
         * @private
         */
        this.__dot = this.__initTemplateEngine();



        /**
         * @type {DiscordRouter}
         * @priate
         */
        this.__router = this.__initDiscordRouter();

        this.__initBotEvents();
    }

    /**
     * Sets up snoowrap
     *
     * @returns Snoowrap
     * @private
     */
    __initRedditClient() {
        return new Snoowrap( {
            userAgent: this.userAgent,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            refreshToken: this.refreshToken
        } );


    }

    /**
     * Sets up discord
     *
     * @returns Discord.client
     * @private
     */
    __initDiscordClient() {
        return new Discord.Client( {
            ws: {
                compress: true
            }
        } );
    }

    /**
     * Sets up the Dot template engine
     *
     * @returns Dot
     * @private
     * @static
     */
    __initTemplateEngine() {
        return Dot.process( { templateSettings: { strip: false }, path: 'views/' } );
    }

    __initDiscordRouter() {
        return new DiscordRouter( this.discordCommands, this.__discord, this.__dot, this.__reddit );
    }

    /**
     * Sets up the bot events
     *
     * @private
     */
    __initBotEvents() {
        this.__discord.on( 'ready', () => {
            console.log( 'Logged in to discord!' );
            this
                .__discord.user
                .setGame( this.commandPrefix + 'help' )
                .catch(
                    ( error ) => {
                        throw(error);
                    } );

        } );
        this.__discord.on( 'message', ( msg ) => this.handleMessage( msg ) );
        this.__discord.on( 'messageUpdate', ( oldMessage, newMessage ) => this.handleMessage( newMessage ) );
        this.__discord.on( 'disconnected', () => {
            console.log( 'Disconnected!' );
            process.exit( 1 ); //exit node.js with an error
        } );
    }

    /**
     *
     * @param msg { Discord.Message }
     * @returns {*}
     */
    handleMessage( msg ) {
        try {
            if (msg.author !== this.__discord.user) {
                let cmd = this.__router.checkMessagesForCommand( msg );

                if ( cmd !== false ) {
                    return cmd.process( msg, { subreddit: this.subreddit } );
                }

                if (msg.content.substring( 0, this.commandPrefix.length ) === this.commandPrefix) {
                    msg.channel.sendMessage(
                        'Not recognized as a command! Try ' + this.commandPrefix + 'help' ).then( (message => message.delete( 5000 ))
                    );
                }
            }

            return false;
        } catch ( e ) {
            let msgTxt = 'fail! :(';
            if ( this.debug ) {
                msgTxt += '\n' + e.stack;
            }
            msg.channel.sendMessage( msgTxt );
            throw e;
        }
    }

    /**
     *
     */
    go() {
        this.__discord.login( this.discordToken )
            .then( ( respsonse ) => {
                console.log( 'response', respsonse );
            } )
            .catch( ( error ) => {
                throw error;
            } );
    }
}