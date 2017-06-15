'use strict';

export default class Toy {

    /**
     *
     * @param toybox {Toybox}
     * @param config {Config}
     */
    constructor(toybox, config) {

        /**
         *
         * @type {Toybox}
         */
        this.toybox = toybox;

        /**
         * 
         * @type {Config}
         */
        this.config = config;
    }

    /**
     * @returns {{}}
     */
    provides(){}


    boot(){}


}