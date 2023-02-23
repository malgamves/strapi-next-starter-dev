'use strict';

/**
 * random service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::random.random');
