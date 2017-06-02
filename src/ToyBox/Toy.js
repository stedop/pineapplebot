"use strict";

import Config from 'config';

export default class Toy {

    constructor(config) {
        /**
         * 
         * @type {Config}
         */
        this.config = config;
        this.boot();
    }

    /**
     * @returns {{}}
     */
    provides(){}


    boot(){}


}