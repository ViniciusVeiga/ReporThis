'use strict';

const 
    _ = require('lodash'),
    env = process.env.NODE_ENV || 'local',
    envConfig = require(`./${env}`);

module.exports = _.merge({env}, envConfig);