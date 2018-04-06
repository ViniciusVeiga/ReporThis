'use strict';

const service = require('./usersService')();

module.exports = server => {
    
    server.get('/users', async (req, res) => {
        let users = await service.getUsers(server.settings.database);
        if(users) {
            res.status(200).json(users);
        }
        else {
            res.status(406).end();
        }
    });
    
    server.get('/user/:id', async (req, res) => {
        let user = await service.getUser(req.params.id, server.settings.database);
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(406).end();
        }
    });
    
    server.post('/user', async (req, res) => {
        let user = await service.createUser(req.body, server.settings.database);
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(406).end();
        }
    });
    
    server.put('/user', async (req, res) => {
        let user = await service.editUser(req.body, server.settings.database);
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(406).end();
        }
    });

    server.delete('/user', async (req, res) => {
        let user = await service.deleteUser(req.body, server.settings.database);
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(406).end();
        }
    });
};