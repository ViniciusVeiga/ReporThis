'use strict';

const
	express = require('express'),
	service = require('./statusesService')();

module.exports = server => {
	let router = express.Router();

	router.get('/statuses', async (req, res) => {
		let statuses = await service.getStatuses(server.settings.database);
		if(statuses) {
			res.status(200).json(statuses);
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