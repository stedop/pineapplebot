'use strict';

import { defaults, each, sortBy } from 'lodash';
import Snoowrap from 'snoowrap';
import Discord from 'discord.js';
import Dot from 'dot';
//import DateFormat from 'dateformat';
import Ping from './Discord/Ping';
import TopTen from './Discord/Top';

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
            'ping': new Ping(this.__discord, this.__dot, this.__reddit).boot(),
            'topten': new TopTen(this.__discord, this.__dot, this.__reddit).boot()
        };

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

        this.__discord.on( 'message', ( msg ) => {
            this.checkMessagesForCommand( msg, false );
        } );
        this.__discord.on( 'messageUpdate', ( oldMessage, newMessage ) => {
            this.checkMessagesForCommand( newMessage, true );
        } );
    }

    /**
     *
     * @param msg
     * @param isEdit
     */
    checkMessagesForCommand( msg, isEdit ) {
        //check if message is a command
        if ( msg.author.id !== this.__discord.user.id && msg.content.startsWith( this.commandPrefix ) ) {
            console.log( 'treating ' + msg.content + ' from ' + msg.author + ' as command' );
            let cmdTxt = msg.content.split( ' ' )[ 0 ].substring( this.commandPrefix.length );
            let suffix = msg.content.substring( cmdTxt.length + this.commandPrefix.length + 1 );//add one for the ! and one for the space
            if ( msg.isMentioned( this.__discord.user ) ) {
                try {
                    cmdTxt = msg.content.split( ' ' )[ 1 ];
                    suffix = msg.content.substring( this.__discord.user.mention().length + cmdTxt.length + this.commandPrefix.length + 1 );
                } catch ( e ) { //no command
                    msg.channel.sendMessage( 'Yes?' );
                    return;
                }
            }

            let cmd = this.discordCommands[ cmdTxt ];

            if ( cmdTxt === 'help' ) {
                //help is special since it iterates over the other this.discordCommands
                this.helpCommand( suffix, msg );
            }
            else if ( cmd ) {

                try {
                    cmd.process( msg, { subreddit: this.subreddit, suffix: suffix }, isEdit  );
                } catch ( e ) {
                    let msgTxt = 'command ' + cmdTxt + ' failed :(';
                    if ( this.debug ) {
                        msgTxt += '\n' + e.stack;
                    }
                    msg.channel.sendMessage( msgTxt );
                    throw(e);
                }

            } else {
                msg.channel.sendMessage(
                    cmdTxt + ' not recognized as a command!' ).then( (message => message.delete( 5000 ))
                );
            }
        } else {
            //message isn't a command or is from us
            //drop our own messages to prevent feedback loops
            if ( msg.author === this.__discord.user ) {
                return;
            }

            if ( msg.author !== this.__discord.user && msg.isMentioned( this.__discord.user ) ) {
                msg.channel.sendMessage( msg.author + ', you called?' );
            }
        }
    }

    /**
     * Rund the help comand
     * @param suffix
     * @param msg Disco
     */
    helpCommand( suffix, msg ) {
        let commands = this.discordCommands;
        let cmds = {};
        if ( suffix ) {
            cmds = suffix.split( ' ' ).filter( function ( cmd ) {
                return commands[ cmd ];
            } );
        } else {
            cmds = sortBy( commands, [ '' ] );
        }

        let contents = this.__dot.helpList( { 'commands': cmds } );
        this.sendBatchedMessage(contents, msg);

    }

    sendBatchedMessage(contents, msg) {
        let batches = contents.match(/.{1,1016}/g);

        each(batches, (batch) => {
            msg.author.sendMessage( batch ).catch( ( error ) => {
                throw(error);
            } );
        });
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