'use strict';

/**
 * @import { Message } from 'discord.js';
 */
import { filter, matchesProperty } from 'lodash';
import DiscordCommand from './../DiscordCommand';
import axios from 'axios';

export default class Where extends DiscordCommand {
    /**
     * Define command
     * @returns { Where }
     */
    boot() {
        this.name = 'Where';
        this.syntax = 'where <username>';
        this.description = 'will tell you if this user is registered on the map and tell you their location';
        return this;
    }

    /**
     *
     * @param message { Message }
     * @param params {{}}
     */
    process( message, params ) {
        let username = this.suffix;
        if (username) {
            axios
                .get( 'https://www.zeemaps.com/emarkers?g=2551174&k=REGULAR&e=false&_dc=0.6138917768604712' )
                .then( ( response ) => {
                    let location = filter( response.data, { 'nm': username } )[0];
                    if ( location ) {
                        message.channel.sendMessage( message.author + ' ' + username + ' is in ' + location.city );
                    } else {
                        message.channel.sendMessage( message.author + ' ' + username + ' not found on the map' );
                    }
                },
                ( error ) => {
                    throw error;
                } );
        } else {
            message.channel.sendMessage( message.author + ' I need a name to search for eg. !where pineapplebot');
        }
    }
}