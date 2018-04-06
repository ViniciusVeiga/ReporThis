'use strict';

module.exports = () => {
	const getCategorys = async database => {
		let categorys = [];
		try {
			categorys = JSON.parse(await database.read()).categorys;
		} catch(err) {
			console.log(err);
			return null;
		}
		return categorys ? categorys : [];
	};

	const setCategorys = async (database, categorys) => {
		let data = {}, category = {};
		try {
			data = JSON.parse(await database.read());
			data.categorys = categorys;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getCategorys,
		setCategorys
	};
}