'use strict';

module.exports = () => {
	const getCategories = async database => {
		let categories = [];
		try {
			categories = JSON.parse(await database.read()).categories;
		} catch(err) {
			console.log(err);
			return null;
		}
		return categories ? categories : [];
	};

	const setCategories = async (database, categories) => {
		let data = {}, category = {};
		try {
			data = JSON.parse(await database.read());
			data.categories = categories;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getCategories,
		setCategories
	};
}