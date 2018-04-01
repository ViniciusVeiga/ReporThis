'use strict';

const service = require('./usersService')();

module.exports = server => {
    /*
    Retorna array de usuários:
    [
        {
            ID,
            EMAIL,
            NAME,
            REGISTRY,
            PASSWORD
        }
    ]
    */
    server.get('/users', (req, res) => {
        res.status(200).json(service.getUsers(server.settings.database));
    });
    /*
    Recebe ou ID, ou REGISTRY, ou EMAIL ou NAME
    Retorna usuário:
    {
        ID,
        EMAIL,
        NAME,
        REGISTRY,
        PASSWORD
    }
    */
    server.get('/user', (req, res) => {
        res.status(200).json({ ok: true });
    });
    /*
    RECEBE:
    {
        email,
        name,
        registry,
        password
    }
    RETORNA INFO DO USUÁRIO CRIADO:
    {
        ID,
        EMAIL,
        NAME,
        REGISTRY,
        PASSWORD
    }
    */
    server.post('/user', (req, res) => {
        res.status(200).json(service.createUser(req.body, server.settings.database));
    });
    /*
    RECEBE: (só os campos que forem editados, caso um campo não for mudar, basta não incluir ele)
    * ID não se altera, porém é obrigatório para identificar o usuário
    {
        id,
        email,
        name,
        registry,
        password
    }
    RETORNA objeto com status da operação
    */
    server.patch('/user', (req, res) => {
        res.status(200).json(service.editUser(req.body, server.settings.database));
    });

    server.delete('/user', (req, res) => {
        res.status(200).json({ ok: true });
    });
};
