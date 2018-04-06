'use strict';

const
	express = require('express'),
	service = require('./statussService')();

module.exports = server => {
	let router = express.Router();

	router.get('/statuss', async (req, res) => {
		let statuss = await service.getStatuss(server.settings.database);
		if(statuss) {
			res.status(200).json(statuss);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.get('/status/:id', async (req, res) => {
		let status = await service.getStatus(req.params.id, server.settings.database);
		if(status) {
			res.status(200).json(status);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.post('/status', async (req, res) => {
		let status = await service.createStatus(req.body, server.settings.database);
		if(status) {
			res.status(200).json(status);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.put('/status', async (req, res) => {
		let status = await service.editStatus(req.body, server.settings.database);
		if(status) {
			res.status(200).json(status);
		}
		else {
			res.status(406).end();
		}
	});

	router.delete('/status', async (req, res) => {
		let status = await service.deleteStatus(req.body, server.settings.database);
		if(status) {
			res.status(200).json(status);
		}
		else {
			res.status(406).end();
		}
	});

	return router;
};