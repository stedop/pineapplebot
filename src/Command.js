'use strict';

import { defaults } from 'lodash';
import Discord from 'discord.js';
import Dot from 'dot';

export default class Command {

    /**
     *
     */
    constructor() {
        this.name = '';
        this.syntax = '';
        this.description = '';
    }

    /**
     * Handles the command
     */
    process() {

    }
}