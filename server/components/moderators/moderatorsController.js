'use strict';

const
	express = require('express'),
	service = require('./moderatorsService')();

module.exports = server => {
	let router = express.Router();

	router.get('/moderators', async (req, res) => {
		let moderators = await service.getModerators(server.settings.database);
		if(moderators) {
			res.status(200).json(moderators);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.get('/moderator/:id', async (req, res) => {
		let moderator = await service.getModerator(req.params.id, server.settings.database);
		if(moderator) {
			res.status(200).json(moderator);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.post('/moderator', async (req, res) => {
		let moderator = await service.createModerator(req.body, server.settings.database);
		if(moderator) {
			res.status(200).json(moderator);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.put('/moderator', async (req, res) => {
		let moderator = await service.editModerator(req.body, server.settings.database);
		if(moderator) {
			res.status(200).json(moderator);
		}
		else {
			res.status(406).end();
		}
	});

	router.delete('/moderator', async (req, res) => {
		let moderator = await service.deleteModerator(req.body, server.settings.database);
		if(moderator) {
			res.status(200).json(moderator);
		}
		else {
			res.status(406).end();
		}
	});

	return router;
};