'use strict';

import Toy from '../Toy';
import EventEmitter from 'events';

export default class Toker extends Toy {

    /**
     *
     * @returns {{}}
     */
    provides() {
        return {
            'toker': this.toker
        };
    }

    boot() {
        this.toker = new EventEmitter();
    }
}