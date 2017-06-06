'use strict';

import Toy from './ToyBox/Toy';
import { each } from 'lodash';

export default class Toybox {

    constructor( config ) {
        this.__config = config;

        /**
         * {{}}
         */
        this.__services = {};
        this.__loadServices();
    }

    __loadServices() {
        each( this.__config.get( 'Services' ), ( item ) => {
            this.__addProvider( item );
        } );
    }

    /**
     *
     * @param serviceName {string}
     * @param provides {function}
     */
    add( serviceName, provides = () => {
        return false;
    } ) {
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

        let providerClass = require( './ToyBox/' + provider ).default;
        let providerObject = new providerClass( this, this.__config );
        providerObject.boot();
        let provides = providerObject.provides();
        each( provides, ( item, serviceName ) => {
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