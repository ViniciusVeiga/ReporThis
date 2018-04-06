'use strict';

const
	express = require('express'),
	service = require('./reportsService')();

module.exports = server => {
	let router = express.Router();

	router.get('/reports', async (req, res) => {
		let reports = await service.get0s(server.settings.database);
		if(reports) {
			res.status(200).json(reports);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.get('/report/:id', async (req, res) => {
		let report = await service.get0(req.params.id, server.settings.database);
		if(report) {
			res.status(200).json(report);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.post('/report', async (req, res) => {
		let report = await service.create0(req.body, server.settings.database);
		if(report) {
			res.status(200).json(report);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.put('/report', async (req, res) => {
		let report = await service.edit0(req.body, server.settings.database);
		if(report) {
			res.status(200).json(report);
		}
		else {
			res.status(406).end();
		}
	});

	router.delete('/report', async (req, res) => {
		let report = await service.delete0(req.body, server.settings.database);
		if(report) {
			res.status(200).json(report);
		}
		else {
			res.status(406).end();
		}
	});

	return router;
};