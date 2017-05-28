'use strict';

import { defaults, each, sortBy } from 'lodash';
import Snoowrap from 'snoowrap';
import Discord from 'discord.js';
import Dot from 'dot';
//import DateFormat from 'dateformat';
import DiscordRouter from './DiscordRouter';
import Ping from './Discord/Ping';
import Top from './Discord/Top';

export default class bot {

    /**
     * @summary initialises the bot
     *
     * @param {string} [userAgent] A unique description of what your app does. This argument is not necessary when Snoowrap
     is running in a browser.
     * @param {string} [clientId] The client ID of your app (assigned by reddit)
     * @param {string} [clientSecret] The client secret of your app (assigned by reddit). If you are using a refresh token
     with an installed app (which does not have a client secret), pass an empty string as your `clientSecret`.
     * @param {string} [refreshToken] A refresh token for your app.
     * @param {string} [subreddit] The subreddit name we are going to be managing
     * @param {string} [discordToken] Key for the stats api
     * @param {string} [discordServer] The server to work in discord
     * @param {string} [commandPrefix] The command prefix
     */
    constructor( {
        userAgent,
        clientId,
        clientSecret,
        refreshToken,
        subreddit,
        discordToken,
        discordServer,
        commandPrefix
    } = {} ) {
        if ( clientId === undefined || clientSecret === undefined || refreshToken === undefined ) {
            throw new Error( 'Reddit Credentials not supplied, fuckwit' );
        }

        if ( discordToken === undefined ) {
            throw new Error( 'Discord Token needed, dickhead' );
        }

        defaults( this, {
            userAgent,
            clientId,
            clientSecret,
            refreshToken,
            subreddit,
            discordToken,
            discordServer,
            commandPrefix
        }, {
            userAgent: null,
            clientId: null,
            clientSecret: null,
            refreshToken: null,
            subbreddit: 'uktrees',
            discordToken: null,
            discordServer: '#uktrees',
            commandPrefix: '!'
        } );

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
         *
         * @type {{ping: Command}}
         */
        this.discordCommands = {
            'ping': Ping,
            'top': Top
        };

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
            console.log( 'Logged in!' );
            console.log( 'type ' + this.commandPrefix + 'help in Discord for a this.discordCommands list.' );
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

    handleMessage( msg ) {
        try {
            if (msg.author !== this.__discord.user) {
                let cmd = this.__router.checkMessagesForCommand( msg );

                if ( cmd !== false ) {
                    return cmd.process( msg, { subreddit: this.subreddit } );
                }

                msg.channel.sendMessage(
                    'Not recognized as a command! Try ' + this.commandPrefix + 'help' ).then( (message => message.delete( 5000 ))
                );
            }

            return false;
        } catch ( e ) {
            let msgTxt = 'command ' + cmd + ' failed :(';
            if ( this.debug ) {
                msgTxt += '\n' + e.stack;
            }
            msg.channel.sendMessage( msgTxt );
            throw e;
        }
    }

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