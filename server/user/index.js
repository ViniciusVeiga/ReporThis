const controller = require('./user.controller.js');

module.exports = Router => {
    const router = Router();

    router.get('/', controller.getUsers);

    return router;
};
