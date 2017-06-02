'use strict';

import Toy from './Toy';

export default class Reddit extends Toy {
    provides() {
        return {
            'reddit': new Snoowrap( {
                userAgent: this.userAgent,
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                refreshToken: this.refreshToken
            } );
        };
    }
}