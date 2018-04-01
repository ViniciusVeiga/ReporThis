'use strict';

const
    express = require('express'),
    router = express.Router();

module.exports = server => {
    require('./users/usersController')(server);
}