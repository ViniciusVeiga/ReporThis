'use strict';

const model = require('./locationsModel')();

module.exports = () => {
	const isValidId = (locations, id) => {
		let isValidId = true;
		locations.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getLocations = async database => {
		return await model.getLocations(database);
	};

	const getLocation = async (id, database) => {
		let location = {}, locations = await model.getLocations(database);
		if(locations) {
			locations.forEach(e => {
				if(e.ID == id) {
					location = e;
					return;
				}
			});
		}
		else {
			return null;
		}
		return location;
	};

	const createLocation = async (location, database) => {
		let i = 1, locations = await getLocations(database);

		while(!isValidId(locations, locations.length + i)) {
			i--;
		}
		location.ID = locations.length + i;
		locations.push(location);

		if(await model.setLocations(database, locations)) {
			return locations[locations.length-1];
		}
		return null;
	};

	const editLocation = async (location, database) => {
		let flag = false, locations = await getLocations(database);

		if(locations) {
			locations.forEach(e => {
				if(e.ID == location.ID) {
					if(location.NAME  || typeof location.NAME === 'string') {
						e.NAME = location.NAME;
					}
					if(location.DESCRIPTION  || typeof location.DESCRIPTION === 'string') {
						e.DESCRIPTION = location.DESCRIPTION;
					}
					if(location.X  || typeof location.X === 'string') {
						e.X = location.X;
					}
					if(location.Y  || typeof location.Y === 'string') {
						e.Y = location.Y;
					}
					if(location.Z  || typeof location.Z === 'string') {
						e.Z = location.Z;
					}
					flag = true;
					model.setLocations(database, locations);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `Location #${location.ID} update`} : {status: `Location #${location.ID} not found`};
	};

	const deleteLocation = async (locationInfo, database) => {
		let i = -1, aux1, aux2, locations = await getLocations(database);
		if(locations) {
			locations.forEach((e, j) => {
				if(e.ID == locationInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = locations.splice(i);
				aux2 = aux1.splice(1);
				locations = locations.concat(aux2);
				locations = await model.setLocations(database, locations);
			}
			else {
				locations = null;
			}
		}
		return locations;
	};

	return {
		getLocations,
		getLocation,
		createLocation,
		editLocation,
		deleteLocation
	};
}