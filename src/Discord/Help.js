import { sortBy, each } from 'lodash';
import DiscordCommand from './../DiscordCommand';
import { Message } from 'discord.js';
import axios from 'Axios';

export default class Help extends DiscordCommand {
    /**
     * Define command
     * @returns { Where }
     */
    boot() {
        this.name = 'Where';
        this.syntax = 'where <username> ';
        this.description = 'will tell you if this user is registered on the map and tell you their location';
        return this;
    }

    /**
     *
     * @param message { Message }
     * @param params {{}}
     */
    process( message, params ) {
        let routes = this.routes;
        let cmds = {};
        if ( this.suffix ) {
            cmds = this.suffix.split( ' ' ).filter( function ( cmd ) {
                return routes[ cmd ];
            } );
        } else {
            cmds = sortBy( routes, [ '' ] );
        }

        let contents = this.__dot.helpList( { 'commands': cmds } );
        this.sendBatchedMessage( contents, message );
    }


    /**
     *
     * @param contents string
     * @param msg Discord.Message
     */
    sendBatchedMessage( contents, msg ) {
        let batches = contents.match( /.{1,1016}/g );

        each( batches, ( batch ) => {
            msg.author.sendMessage( batch ).catch( ( error ) => {
                throw(error);
            } );
        } );
    }
}