'use strict';

/**
 * @import Toybox from './Toybox';
 * @import Config from 'config';
 * @import Client from 'discord.js';
 * @import Dot from 'dot';
 * @import Snoowrap from 'snoowrap';
 */
export default class DiscordCommand {

    /**
     * Sets up command
     *
     * @param discord {Client}
     * @param toybox {Toybox}
     *
     * @returns {DiscordCommand}
     */
    constructor( discord, toybox ) {
        /**
         *
         * @type {Toybox}
         * @private
         */
        this.__toybox = toybox;

        /**
         *
         * @type {Client}
         * @private
         */
        this.__discord = discord;

        /**
         *
         * @type {Dot}
         * @private
         */
        this.__dot = this.__toybox.get('dot');

        /**
         *
         * @type {Snoowrap}
         * @private
         */
        this.__reddit = this.__toybox.get('reddit');

        /**
         *
         * @type {Config}
         * @private
         */
        this.__config = this.__toybox.get('config');

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