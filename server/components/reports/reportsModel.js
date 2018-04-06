'use strict';

module.exports = () => {
	const get0s = async database => {
		let reports = [];
		try {
			reports = JSON.parse(await database.read()).reports;
		} catch(err) {
			console.log(err);
			return null;
		}
		return reports ? reports : [];
	};

	const set0s = async (database, reports) => {
		let data = {}, report = {};
		try {
			data = JSON.parse(await database.read());
			data.reports = reports;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		get0s,
		set0s
	};
}