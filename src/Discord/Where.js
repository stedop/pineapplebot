import { each } from 'lodash';
import DiscordCommand from './../DiscordCommand';
import { Message } from 'discord.js';
import axios from 'Axios';

export default class Where extends DiscordCommand {
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
        let username = this.suffix;
        axios.get('https://www.zeemaps.com/emarkers?g=2551174&k=REGULAR&e=false&_dc=0.6138917768604712').then((response) => {
                console.log(response);
            },
            (error) => {
                throw error;
            });
    }
}