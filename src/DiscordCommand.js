'use strict';

import Dot from 'dot';
import Snoowrap from 'snoowrap';
import Discord from 'discord.js';
import Config from 'config';

export default class DiscordCommand {

    /**
     * Sets up command
     *
     * @param discord { Discord.Client }
     * @param dot { Dot }
     * @param reddit { Snoowrap }
     * @param config { Config }
     * @returns {DiscordCommand}
     */
    constructor( discord, dot, reddit, config ) {
        this.__discord = discord;
        this.__dot = dot;
        this.__reddit = reddit;
        this.__config = config;

        return this;
    }

    boot() {

    }

    /**
     * Handles the command
     */
    process() {

    }
}