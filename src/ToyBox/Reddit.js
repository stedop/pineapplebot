'use strict';

import Toy from './Toy';
import Snoowrap from 'snoowrap';

export default class Reddit extends Toy {
    provides() {
        return {
            'reddit': new Snoowrap( {
                userAgent: this.config.get('Reddit.userAgent'),
                clientId: this.config.get('Reddit.clientId'),
                clientSecret: this.config.get('Reddit.clientSecret'),
                refreshToken: this.config.get('Reddit.refreshToken')
            } )
        };
    }
}