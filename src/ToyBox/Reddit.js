'use strict';

import Toy from './Toy';
import Snoowrap from 'snoowrap';

export default class Reddit extends Toy {
    provides() {
        return {
            'reddit': new Snoowrap( {
                userAgent: this.__config.get('Reddit.userAgent'),
                clientId: this.__config.get('Reddit.clientId'),
                clientSecret: this.__config.get('Reddit.clientSecret'),
                refreshToken: this.__config.get('Reddit.refreshToken')
            } )
        };
    }
}