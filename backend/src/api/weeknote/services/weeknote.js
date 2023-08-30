'use strict';

/**
 * weeknote service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::weeknote.weeknote');
