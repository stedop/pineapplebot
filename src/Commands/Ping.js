import Dot from 'dot';
import Snoowrap from 'snoowrap';

export default class Ping {

    /**
     * Sets up command
     *
     * @returns {Ping}
     */
    constructor() {
        this.name = 'Ping';
        this.syntax = 'ping';
        this.description = 'responds pong, useful for checking if bot is alive';
        return this;
    }


    /**
     * todo work out babel extends and move this to the command class
     * @param discord { Discord.Client }
     * @param dot { Dot }
     * @param reddit { Snoowrap }
     * @returns { TopTen }
     */
    boot(discord, dot, reddit) {
        this.__discord = discord;
        this.__dot = dot;
        this.__reddit = reddit;
        return this;
    }

    /**
     *
     * @param message { Discord.message }
     * @param params { {} }
     * @param isEdit { boolean }
     */
    process(message, params, isEdit) {
        message.channel.sendMessage( message.author + ' pong!' ).catch(
            (error) => {
                throw error;
            }
        );
        if ( params.suffix ) {
            message.channel.sendMessage( 'note that !ping takes no arguments!' ).catch(
                (error) => {
                    throw error;
                }
            );
        }
    }
}