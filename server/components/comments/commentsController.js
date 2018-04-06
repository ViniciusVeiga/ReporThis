'use strict';

const
	express = require('express'),
	service = require('./commentsService')();

module.exports = server => {
	let router = express.Router();

	router.get('/comments', async (req, res) => {
		let comments = await service.getComments(server.settings.database);
		if(comments) {
			res.status(200).json(comments);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.get('/comment/:id', async (req, res) => {
		let comment = await service.getComment(req.params.id, server.settings.database);
		if(comment) {
			res.status(200).json(comment);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.post('/comment', async (req, res) => {
		let comment = await service.createComment(req.body, server.settings.database);
		if(comment) {
			res.status(200).json(comment);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.put('/comment', async (req, res) => {
		let comment = await service.editComment(req.body, server.settings.database);
		if(comment) {
			res.status(200).json(comment);
		}
		else {
			res.status(406).end();
		}
	});

	router.delete('/comment', async (req, res) => {
		let comment = await service.deleteComment(req.body, server.settings.database);
		if(comment) {
			res.status(200).json(comment);
		}
		else {
			res.status(406).end();
		}
	});

	return router;
};