'use strict';

module.exports = () => {
	const getStatuses = async database => {
		let statuses = [];
		try {
			statuses = JSON.parse(await database.read()).statuses;
		} catch(err) {
			console.log(err);
			return null;
		}
		return statuses ? statuses : [];
	};

	const setStatuses = async (database, statuses) => {
		let data = {}, status = {};
		try {
			data = JSON.parse(await database.read());
			data.statuses = statuses;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getStatuses,
		setStatuses
	};
}