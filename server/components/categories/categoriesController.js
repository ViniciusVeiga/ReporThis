'use strict';

const
	express = require('express'),
	service = require('./categoriesService')();

module.exports = server => {
	let router = express.Router();

	router.get('/categories', async (req, res) => {
		let categories = await service.getCategories(server.settings.database);
		if(categories) {
			res.status(200).json(categories);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.get('/category/:id', async (req, res) => {
		let category = await service.getCategory(req.params.id, server.settings.database);
		if(category) {
			res.status(200).json(category);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.post('/category', async (req, res) => {
		let category = await service.createCategory(req.body, server.settings.database);
		if(category) {
			res.status(200).json(category);
		}
		else {
			res.status(406).end();
		}
	});
	
	router.put('/category', async (req, res) => {
		let category = await service.editCategory(req.body, server.settings.database);
		if(category) {
			res.status(200).json(category);
		}
		else {
			res.status(406).end();
		}
	});

	router.delete('/category', async (req, res) => {
		let category = await service.deleteCategory(req.body, server.settings.database);
		if(category) {
			res.status(200).json(category);
		}
		else {
			res.status(406).end();
		}
	});

	return router;
};