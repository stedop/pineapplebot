import { each } from 'lodash';
import DiscordCommand from './../DiscordCommand';

export default class TopTen extends DiscordCommand {

    /**
     * Define command
     * @returns { TopTen }
     */
    boot() {
        this.name = 'TopTen';
        this.syntax = 'topten';
        this.description = 'lists the topten posts in uktrees';
        return this;
    }

    /**
     *
     * @param message { Discord.Message }
     * @param params {{}}
     * @param isEdit { boolean }
     */
    process( message, params, isEdit ) {
        this
            .__reddit
            .getSubreddit( params.subreddit )
            .getHot()
            .then(
                ( response ) => {
                    this.sendBatchedMessage( this.__dot.topTen( { 'listings': response.slice( 0, 10 ) } ), message );
                } );

        if ( params.suffix ) {
            message.channel.sendMessage( 'note that !topten takes no arguments!' ).catch(
                ( error ) => {
                    throw error;
                }
            );
        }
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