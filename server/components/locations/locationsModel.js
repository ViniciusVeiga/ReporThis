'use strict';

module.exports = () => {
	const getLocations = async database => {
		let locations = [];
		try {
			locations = JSON.parse(await database.read()).locations;
		} catch(err) {
			console.log(err);
			return null;
		}
		return locations ? locations : [];
	};

	const setLocations = async (database, locations) => {
		let data = {}, location = {};
		try {
			data = JSON.parse(await database.read());
			data.locations = locations;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getLocations,
		setLocations
	};
}