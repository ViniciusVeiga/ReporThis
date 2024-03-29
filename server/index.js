const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');

const user = require('./user');

module.exports = (app, dirname) => {
    const { Router } = express;
    const router = Router();
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', express.static(`${__dirname}/../client/`));

    app.use(async (req, res, next) => {
        req.connection = await db({
            connectionString: process.env.DATABASE_URL,
        });
        if(req.connection._connected) {
            next();
        }
        else {
            res.send(500).end();
        }
    });

    router.use('/user', user(Router));

    app.use('/api', router);

    app.use(async (req, res, next) => {
        if(typeof req.connection.close == 'function') {
            await req.connection.close();
        }
        next();
    });

    app.listen(port, () => console.log(`Server listen on ${port}`));
};
