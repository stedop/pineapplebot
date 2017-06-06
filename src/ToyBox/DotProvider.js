'use strict';

import Toy from './Toy';
import Dot from 'dot';

export default class DotProvider extends Toy {

    provides() {
        return { 'dot': Dot.process( { templateSettings: { strip: false }, path: this.__config.get('Dot.path') } ) };
    }

}