import Dot from 'dot';
import DiscordCommand from './../DiscordCommand';

export default class Ping extends DiscordCommand {

    /**
     * Sets up command
     *
     * @returns {Ping}
     */
    boot() {
        this.name = 'Ping';
        this.syntax = 'ping';
        this.description = 'responds pong, useful for checking if bot is alive';
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