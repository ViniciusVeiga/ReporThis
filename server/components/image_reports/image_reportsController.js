'use strict';

const
	express = require('express'),
	service = require('./image_reportsService')();

module.exports = server => {
	let router = express.Router();

	router.get('/image_reports', async (req, res) => {
		let image_reports = await service.getImage_reports(server.settings.database);
		if(image_reports) {
			res.status(200).json(image_reports);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.get('/image_report/:id', async (req, res) => {
		let image_report = await service.getImage_report(req.params.id, server.settings.database);
		if(image_report) {
			res.status(200).json(image_report);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.post('/image_report', async (req, res) => {
		let image_report = await service.createImage_report(req.body, server.settings.database);
		if(image_report) {
			res.status(200).json(image_report);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.put('/image_report', async (req, res) => {
		let image_report = await service.editImage_report(req.body, server.settings.database);
		if(image_report) {
			res.status(200).json(image_report);
		}
		else {
			res.status(406).end();
		}
	});

	router.delete('/image_report', async (req, res) => {
		let image_report = await service.deleteImage_report(req.body, server.settings.database);
		if(image_report) {
			res.status(200).json(image_report);
		}
		else {
			res.status(406).end();
		}
	});

	return router;
};