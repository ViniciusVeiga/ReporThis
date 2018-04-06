'use strict';

module.exports = () => {
	const getStatuss = async database => {
		let statuss = [];
		try {
			statuss = JSON.parse(await database.read()).statuss;
		} catch(err) {
			console.log(err);
			return null;
		}
		return statuss ? statuss : [];
	};

	const setStatuss = async (database, statuss) => {
		let data = {}, status = {};
		try {
			data = JSON.parse(await database.read());
			data.statuss = statuss;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getStatuss,
		setStatuss
	};
}