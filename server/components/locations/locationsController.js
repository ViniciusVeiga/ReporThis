'use strict';

const
	express = require('express'),
	service = require('./locationsService')();

module.exports = server => {
	let router = express.Router();

	router.get('/locations', async (req, res) => {
		let locations = await service.getLocations(server.settings.database);
		if(locations) {
			res.status(200).json(locations);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.get('/location/:id', async (req, res) => {
		let location = await service.getLocation(req.params.id, server.settings.database);
		if(location) {
			res.status(200).json(location);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.post('/location', async (req, res) => {
		let location = await service.createLocation(req.body, server.settings.database);
		if(location) {
			res.status(200).json(location);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.put('/location', async (req, res) => {
		let location = await service.editLocation(req.body, server.settings.database);
		if(location) {
			res.status(200).json(location);
		}
		else {
			res.status(406).end();
		}
	});

	router.delete('/location', async (req, res) => {
		let location = await service.deleteLocation(req.body, server.settings.database);
		if(location) {
			res.status(200).json(location);
		}
		else {
			res.status(406).end();
		}
	});

	return router;
};