import { sortBy, each } from 'lodash';
import DiscordCommand from './../DiscordCommand';
import { Message } from 'discord.js';

export default class Help extends DiscordCommand {
    /**
     * Define command
     * @returns { Help }
     */
    boot() {
        this.name = 'Help';
        this.syntax = 'help <command>';
        this.description = 'give the help for a command, leave blank to list all commands';
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

        let contents = this.__dot.helpList( { 'commands': cmds, 'prefix': this.__config.get('Discord.commandPrefix') } );
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