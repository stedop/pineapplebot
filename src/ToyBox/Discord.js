'use strict';

import Toy from './Toy';
import { Client } from 'discord.js';
import DiscordRouter from './../DiscordRouter';

import Help from './../Discord/Help';
import Ping from './../Discord/Ping';
import Top from './../Discord/Top';
import Where from './../Discord/Where';

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
     * @returns {{}}
     */
    provides() {
        return {
            'discord' : this.__discord,
            'router' : this.setupRouter()
        };
    }

    setupRouter() {
        return new DiscordRouter( this.discordCommands, ToyBox.get('dot'), Toybox.get('reddit'), this.config);
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
}
