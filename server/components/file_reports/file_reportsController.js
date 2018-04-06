'use strict';

const
	express = require('express'),
	service = require('./file_reportsService')();

module.exports = server => {
	let router = express.Router();

	router.get('/file_reports', async (req, res) => {
		let file_reports = await service.getFile_reports(server.settings.database);
		if(file_reports) {
			res.status(200).json(file_reports);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.get('/file_report/:id', async (req, res) => {
		let file_report = await service.getFile_report(req.params.id, server.settings.database);
		if(file_report) {
			res.status(200).json(file_report);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.post('/file_report', async (req, res) => {
		let file_report = await service.createFile_report(req.body, server.settings.database);
		if(file_report) {
			res.status(200).json(file_report);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.put('/file_report', async (req, res) => {
		let file_report = await service.editFile_report(req.body, server.settings.database);
		if(file_report) {
			res.status(200).json(file_report);
		}
		else {
			res.status(406).end();
		}
	});

	router.delete('/file_report', async (req, res) => {
		let file_report = await service.deleteFile_report(req.body, server.settings.database);
		if(file_report) {
			res.status(200).json(file_report);
		}
		else {
			res.status(406).end();
		}
	});

	return router;
};