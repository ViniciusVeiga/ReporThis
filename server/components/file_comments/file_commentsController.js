'use strict';

const
	express = require('express'),
	service = require('./file_commentsService')();

module.exports = server => {
	let router = express.Router();

	router.get('/file_comments', async (req, res) => {
		let file_comments = await service.getFile_comments(server.settings.database);
		if(file_comments) {
			res.status(200).json(file_comments);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.get('/file_comment/:id', async (req, res) => {
		let file_comment = await service.getFile_comment(req.params.id, server.settings.database);
		if(file_comment) {
			res.status(200).json(file_comment);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.post('/file_comment', async (req, res) => {
		let file_comment = await service.createFile_comment(req.body, server.settings.database);
		if(file_comment) {
			res.status(200).json(file_comment);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.put('/file_comment', async (req, res) => {
		let file_comment = await service.editFile_comment(req.body, server.settings.database);
		if(file_comment) {
			res.status(200).json(file_comment);
		}
		else {
			res.status(406).end();
		}
	});

	router.delete('/file_comment', async (req, res) => {
		let file_comment = await service.deleteFile_comment(req.body, server.settings.database);
		if(file_comment) {
			res.status(200).json(file_comment);
		}
		else {
			res.status(406).end();
		}
	});

	return router;
};