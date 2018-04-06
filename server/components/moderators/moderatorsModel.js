'use strict';

module.exports = () => {
	const getModerators = async database => {
		let moderators = [];
		try {
			moderators = JSON.parse(await database.read()).moderators;
		} catch(err) {
			console.log(err);
			return null;
		}
		return moderators ? moderators : [];
	};

	const setModerators = async (database, moderators) => {
		let data = {}, moderator = {};
		try {
			data = JSON.parse(await database.read());
			data.moderators = moderators;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getModerators,
		setModerators
	};
}