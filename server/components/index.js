'use strict';

const 
    path = require('path');

module.exports = server => {
    server.get('/', (req, res) => {
        res.sendFile(path.resolve(`${__dirname}/../../public/index.html`));
    });

    require('./users/usersController')(server);
}