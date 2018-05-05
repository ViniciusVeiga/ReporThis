const controller = require('./user.controller.js');

module.exports = Router => {
    const router = Router();

    router.get('/', controller.getUsers);
    router.get('/:email', controller.byEmail);

    router.post('/', controller.create);
    router.post('/auth', controller.authenticate);

    return router;
};
