'use strict';

const 
    express = require('express'),
    path = require('path');

module.exports = server => {
    const router = express.Router();

    router.use(require('./users/usersController')(server));

    return router;
}