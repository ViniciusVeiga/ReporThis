const express = require('express');

const user = require('./user');

module.exports = (app, dirname) => {
    const { Router } = express;
    const router = Router();
    const port = process.env.PORT || 3000;

    router.use('/user', user(Router));

    app.use('/api', router);

    app.listen(port, () => logger.info(`Server listen on ${port}`));
};
