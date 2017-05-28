import { each } from 'lodash';
import DiscordCommand from './../DiscordCommand';

export default class Top extends DiscordCommand {

    /**
     * Define command
     * @returns { TopTen }
     */
    boot() {
        this.name = 'Top';
        this.syntax = 'top <number of posts> ';
        this.description = 'lists the top n posts in uktrees, maximum of 10';
        return this;
    }

    /**
     *
     * @param message { Discord.Message }
     * @param params {{}}
     */
    process( message, params ) {

        let n = 5;
        if (params.suffix) {
            n = parseInt(this.suffix);
        }
        this
            .__reddit
            .getSubreddit( params.subreddit )
            .getHot()
            .then(
                ( response ) => {
                    this.sendBatchedMessage( this.__dot.top( { 'listings': response.slice( 0, n ) } ), message );
                } );
    }

    /**
     *
     * @param contents {string}
     * @param msg {Discord.Message}
     */
    sendBatchedMessage( contents, msg ) {
        let batches = contents.match( /.{1,1016}/g );

        each( batches, ( batch ) => {
            msg.channel.sendMessage( batch ).catch( ( error ) => {
                throw(error);
            } );
        } );
    }
}