"use strict";

import Config from 'config';

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
        this.__toybox = toybox;

        /**
         * 
         * @type {Config}
         */
        this.__config = config;
        this.boot();
    }

    /**
     * @returns {{}}
     */
    provides(){}


    boot(){}


}