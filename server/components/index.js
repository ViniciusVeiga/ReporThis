'use strict';

const 
    express = require('express'),
    path = require('path');

module.exports = server => {
    const router = express.Router();

    router.use(require('./users/usersController')(server));
    router.use(require('./categories/categoriesController')(server));
    router.use(require('./comments/commentsController')(server));
    router.use(require('./file_comments/file_commentsController')(server));
    router.use(require('./file_reports/file_reportsController')(server));
    router.use(require('./image_reports/image_reportsController')(server));
    router.use(require('./locations/locationsController')(server));
    router.use(require('./moderators/moderatorsController')(server));
    router.use(require('./reports/reportsController')(server));
    router.use(require('./statuses/statusesController')(server));

    return router;
}