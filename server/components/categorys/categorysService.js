'use strict';

const model = require('./categorysModel')();

module.exports = () => {
	const isValidId = (categorys, id) => {
		let isValidId = true;
		categorys.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getCategorys = async database => {
		return await model.getCategorys(database);
	};

	const getCategory = async (id, database) => {
		let category = {}, categorys = await model.getCategorys(database);
		if(categorys) {
			categorys.forEach(e => {
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
		let i = 1, categorys = await getCategorys(database);

		while(!isValidId(categorys, categorys.length + i)) {
			i--;
		}
		category.ID = categorys.length + i;
		categorys.push(category);

		if(await model.setCategorys(database, categorys)) {
			return categorys[categorys.length-1];
		}
		return null;
	};

	const editCategory = async (category, database) => {
		let flag = false, categorys = await getCategorys(database);

		if(categorys) {
			categorys.forEach(e => {
				if(e.ID == category.ID) {
					if(category.NAME  || typeof category.NAME === 'string') {
						e.NAME = category.NAME;
					}
					flag = true;
					model.setCategorys(database, categorys);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `Category #${category.ID} update`} : {status: `Category #${category.ID} not found`};
	};

	const deleteCategory = async (categoryInfo, database) => {
		let i = -1, aux1, aux2, categorys = await getCategorys(database);
		if(categorys) {
			categorys.forEach((e, j) => {
				if(e.ID == categoryInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = categorys.splice(i);
				aux2 = aux1.splice(1);
				categorys = categorys.concat(aux2);
				categorys = await model.setCategorys(database, categorys);
			}
			else {
				categorys = null;
			}
		}
		return categorys;
	};

	return {
		getCategorys,
		getCategory,
		createCategory,
		editCategory,
		deleteCategory
	};
}