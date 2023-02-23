'use strict';

/**
 * random controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::random.random');
