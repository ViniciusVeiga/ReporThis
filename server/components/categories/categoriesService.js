'use strict';

const model = require('./categoriesModel')();

module.exports = () => {
	const isValidId = (categories, id) => {
		let isValidId = true;
		categories.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getCategories = async database => {
		return await model.getCategories(database);
	};

	const getCategory = async (id, database) => {
		let category = {}, categories = await model.getCategories(database);
		if(categories) {
			categories.forEach(e => {
				if(e.ID == id) {
					category = e;
					return;
				}
			});
		}
		else {
			return null;
		}
		return category;
	};

	const createCategory = async (category, database) => {
		let i = 1, categories = await getCategories(database);

		while(!isValidId(categories, categories.length + i)) {
			i--;
		}
		category.ID = categories.length + i;
		categories.push(category);

		if(await model.setCategories(database, categories)) {
			return categories[categories.length-1];
		}
		return null;
	};

	const editCategory = async (category, database) => {
		let flag = false, categories = await getCategories(database);

		if(categories) {
			categories.forEach(e => {
				if(e.ID == category.ID) {
					if(category.NAME  || typeof category.NAME === 'string') {
						e.NAME = category.NAME;
					}
					flag = true;
					model.setCategories(database, categories);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `Category #${category.ID} update`} : {status: `Category #${category.ID} not found`};
	};

	const deleteCategory = async (categoryInfo, database) => {
		let i = -1, aux1, aux2, categories = await getCategories(database);
		if(categories) {
			categories.forEach((e, j) => {
				if(e.ID == categoryInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = categories.splice(i);
				aux2 = aux1.splice(1);
				categories = categories.concat(aux2);
				categories = await model.setCategories(database, categories);
			}
			else {
				categories = null;
			}
		}
		return categories;
	};

	return {
		getCategories,
		getCategory,
		createCategory,
		editCategory,
		deleteCategory
	};
}