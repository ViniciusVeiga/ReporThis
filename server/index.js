'use strict';

const 
    express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./components');
        

module.exports = () => {
    const server = express();

    const create = config => {
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);
        server.set('viewDir', config.viewDir);
        server.set('database', config.database);
        
        server.use(bodyParser.json());

        server.get('/', (req, res) => {
            res.redirect('/home');
        });    
        
        routes(server);
    };

    const start = () => {
        let hostname = server.get('hostname'),
            port = server.get('port');

        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
    }

    return {
        create: create,
        start: start
    }
}