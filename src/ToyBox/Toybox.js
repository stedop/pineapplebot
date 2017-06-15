'use strict';

import { each } from 'lodash';

export default class Toybox {

    /**
     *
     * @param config {Config}
     * @param narc {Logger}
     */
    constructor( config, narc ) {
        /**
         *
         * @type {Config}
         * @private
         */
        this.__config = config;

        /**
         *
         * @type {Logger}
         * @private
         */
        this.__narc = narc;

        /**
         * {{}}
         */
        this.__services = {};
        this.__loadServices();
    }

    /**
     * Loads the config services
     *
     * @private
     */
    __loadServices() {

        this.__setupBasics();
        each( this.__config.get( 'Services' ), ( item ) => {
            this.__narc.debug('loading service', item);
            this.__addProvider( item );
        } );
    }

    /**
     * Setup the config service
     * @private
     */
    __setupBasics() {
        // provides the logger and config as a service
        this.add('narc', this.__narc);
        this.add('config', this.__config);
    }

    /**
     *
     * @param serviceName {string}
     * @param provides {object}
     */
    add( serviceName, provides ) {
        if ( !this.has( serviceName ) ) {
            this.__services[ serviceName ] = provides;
            return;
        }

        throw new Error( 'Service ' + serviceName + ' already exists' );
    }


    /**
     *
     * @param provider {Toy}
     * @private
     */
    __addProvider( provider ) {

        let fileName = __dirname + '/Toys/' + provider;
        this.__narc.debug('fileName', fileName);
        let providerClass = require( fileName ).default;
        let providerObject = new providerClass( this, this.__config );
        providerObject.boot();
        let provides = providerObject.provides();
        each( provides, ( item, serviceName ) => {
            this.__narc.debug('loading ' + serviceName + ' from provider', item);
            this.add( serviceName, item );
        } );

    }

    /**
     *
     * @param serviceName
     * @returns {*}
     */
    has( serviceName = '' ) {
        return ( typeof this.__services[ serviceName ] !== 'undefined' );
    }

    /**
     *
     * @param serviceName
     * @returns {*}
     */
    get( serviceName = '' ) {

        if ( this.has( serviceName ) ) {
            return this.__services[ serviceName ];
        }

        throw new Error( 'Service ' + serviceName + ' not defined' );
    }


}