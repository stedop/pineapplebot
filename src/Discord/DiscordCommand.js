'use strict';

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
         * @type {ToyBox}
         */
        this.toybox = toybox;

        /**
         *
         * @type {Client}
         */
        this.discord = discord;

        /**
         *
         * @type {Dot}
         */
        this.dot = this.toybox.get('dot');

        /**
         *
         * @type {Snoowrap}
         */
        this.reddit = this.toybox.get('reddit');

        /**
         *
         * @type {Config}
         */
        this.config = this.toybox.get('config');

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