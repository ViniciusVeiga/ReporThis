'use strict';

const model = require('./moderatorsModel')();

module.exports = () => {
	const isValidId = (moderators, id) => {
		let isValidId = true;
		moderators.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getModerators = async database => {
		return await model.getModerators(database);
	};

	const getModerator = async (id, database) => {
		let moderator = {}, moderators = await model.getModerators(database);
		if(moderators) {
			moderators.forEach(e => {
				if(e.ID == id) {
					moderator = e;
					return;
				}
			});
		}
		else {
			return null;
		}
		return moderator;
	};

	const createModerator = async (moderator, database) => {
		let moderators = await getModerators(database);
		moderators.push(moderator);
		if(await model.setModerators(database, moderators)) {
			return moderators[moderators.length-1];
		}
		return null;
	};

	const editModerator = async (moderator, database) => {
		let flag = false, moderators = await getModerators(database);

		if(moderators) {
			moderators.forEach(e => {
				if(e.ID == moderator.ID) {
					e.ID = moderator.ID;
					flag = true;
					model.setModerators(database, moderators);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `Moderator #${moderator.ID} update`} : {status: `Moderator #${moderator.ID} not found`};
	};

	const deleteModerator = async (moderatorInfo, database) => {
		let i = -1, aux1, aux2, moderators = await getModerators(database);
		if(moderators) {
			moderators.forEach((e, j) => {
				if(e.ID == moderatorInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = moderators.splice(i);
				aux2 = aux1.splice(1);
				moderators = moderators.concat(aux2);
				moderators = await model.setModerators(database, moderators);
			}
			else {
				moderators = null;
			}
		}
		return moderators;
	};

	return {
		getModerators,
		getModerator,
		createModerator,
		editModerator,
		deleteModerator
	};
}