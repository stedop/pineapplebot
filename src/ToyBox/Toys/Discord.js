'use strict';

import Toy from '../Toy';
import { Client } from 'discord.js';
import DiscordRouter from '../../Discord/DiscordRouter';
// Commands
import Help from '../../Discord/Commands/Help';
import Ping from '../../Discord/Commands/Ping';
import Top from '../../Discord/Commands/Top';
import Where from '../../Discord/Commands/Where';

export default class Discord extends Toy {
    boot() {

        /**
         *
         * @type {{}}
         */
        this.discordCommands = {
            'help': Help,
            'ping': Ping,
            'top': Top,
            'where': Where
        };

        /**
         *
         * @type {Client}
         * @private
         */
        this.__discord = new Client( {
            ws: {
                compress: true
            }
        } );

        /**
         *
         * @type {DiscordRouter}
         * @private
         */
        this.__router = this.setupRouter();

        /**
         *
         * @type {Logger}
         * @private
         */
        this.__narc = this.toybox.get('narc');

        this.__discord.on( 'ready', () => {
            this.__narc.info( 'Logged in to discord!' );
            this
                .__discord.user
                .setGame( this.config.get( 'Discord.commandPrefix' ) + 'help' )
                .catch(
                    ( error ) => {
                        throw(error);
                    } );
        } );
        this.__discord.on( 'message', ( msg ) => this.handleMessage( msg ) );
        this.__discord.on( 'messageUpdate', ( oldMessage, newMessage ) => this.handleMessage( newMessage ) );
        this.__discord.on( 'disconnected', () => {
            this.__narc.error( 'Disconnected!' );
            process.exit( 1 ); //exit node.js with an error
        } );
    }

    /**
     * @returns {{}}
     */
    provides() {

        return {
            'discord': this.__discord,
            'router': this.__router
        };
    }

    /**
     *
     * @returns {DiscordRouter}
     */
    setupRouter() {
        return new DiscordRouter( this.discordCommands, this.__discord, this.toybox, this.config );
    }

    /**
     *
     * @param msg { Discord.Message }
     * @returns {*}
     */
    handleMessage( msg ) {
        try {
            if ( msg.author !== this.__discord.user ) {
                let cmd = this.__router.checkMessagesForCommand( msg );

                if ( cmd !== false ) {
                    return cmd.process( msg );
                }

                if ( msg.content.substring( 0, this.commandPrefix.length ) === this.commandPrefix ) {
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
}
