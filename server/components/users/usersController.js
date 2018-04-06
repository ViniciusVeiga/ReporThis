'use strict';

const 
    express = require('express'),
    service = require('./usersService')();

module.exports = server => {
    let router = express.Router();

    router.get('/users', async (req, res) => {
        let users = await service.getUsers(server.settings.database);
        if(users) {
            res.status(200).json(users);
        }
        else {
            res.status(406).end();
        }
    });
    
    router.get('/user/:id', async (req, res) => {
        let user = await service.getUser(req.params.id, server.settings.database);
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(406).end();
        }
    });
    
    router.post('/user', async (req, res) => {
        let user = await service.createUser(req.body, server.settings.database);
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(406).end();
        }
    });
    
    router.put('/user', async (req, res) => {
        let user = await service.editUser(req.body, server.settings.database);
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(406).end();
        }
    });

    router.delete('/user', async (req, res) => {
        let user = await service.deleteUser(req.body, server.settings.database);
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(406).end();
        }
    });

    return router;
};