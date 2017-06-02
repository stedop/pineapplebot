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
        each(this.__config.get('Services'), (item) => {
            this.__addProvider(item);
        });
    }

    /**
     *
     * @param serviceName {string}
     * @param provides {function}
     */
    add(serviceName, provides = () => { return false; } ) {
        if (!this.has(serviceName)) {
            this.__services[serviceName] = provides;
        }

        throw new Error('Service ' + serviceName + ' already exists');
    }


    /**
     *
     * @param provider {Toy}
     * @private
     */
    __addProvider(provider) {
        let providerObject = new provider();
        providerObject.boot();
        let provides = providerObject.provides();

        each(provides, ( serviceName, item) => {
            this.add(serviceName, () => { return item; } );
        });

    }

    /**
     *
     * @param serviceName
     * @returns {*}
     */
    has(serviceName = '') {
        return (this.__services[serviceName]);
    }

    /**
     *
     * @param serviceName
     * @returns {*}
     */
    get(serviceName = '') {

        if (this.has(serviceName)) {
            return this.__services[serviceName];
        }

        throw new Error('Service ' + serviceName + ' not defined' );
    }
}