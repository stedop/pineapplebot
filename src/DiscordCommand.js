'use strict';

import Dot from 'dot';
import Snoowrap from 'snoowrap';
import Discord from 'discord.js';

export default class DiscordCommand {

    /**
     * Sets up command
     *
     * @param discord { Discord.Client }
     * @param dot { Dot }
     * @param reddit { Snoowrap }
     *
     * @returns {TopTen}
     */
    constructor( discord, dot, reddit ) {
        this.__discord = discord;
        this.__dot = dot;
        this.__reddit = reddit;

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