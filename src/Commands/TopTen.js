import Dot from 'dot';
import Snoowrap from 'snoowrap';
import Discord from 'discord.js';
import { each } from 'lodash';

export default class TopTen {

    /**
     * Sets up command
     *
     * @returns {TopTen}
     */
    constructor() {
        this.name = 'TopTen';
        this.syntax = 'topten';
        this.description = 'lists the topten posts in uktrees';
        return this;
    }


    /**
     * todo work out babel extends and move this to the command class
     * @param discord { Discord.Client }
     * @param dot { Dot }
     * @param reddit { Snoowrap }
     * @returns { TopTen }
     */
    boot( discord, dot, reddit ) {
        this.__discord = discord;
        this.__dot = dot;
        this.__reddit = reddit;
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