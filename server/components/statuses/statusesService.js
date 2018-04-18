'use strict';

const model = require('./statusesModel')();

module.exports = () => {
	const isValidId = (statuses, id) => {
		let isValidId = true;
		statuses.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getStatuses = async database => {
		return await model.getStatuses(database);
	};

	const getStatus = async (id, database) => {
		let status = {}, statuses = await model.getStatuses(database);
		if(statuses) {
			statuses.forEach(e => {
				if(e.ID == id) {
					status = e;
					return;
				}
			});
		}
		else {
			return null;
		}
		return status;
	};

	const createStatus = async (status, database) => {
		let i = 1, statuses = await getStatuses(database);

		while(!isValidId(statuses, statuses.length + i)) {
			i--;
		}
		status.ID = statuses.length + i;
		statuses.push(status);

		if(await model.setStatuses(database, statuses)) {
			return statuses[statuses.length-1];
		}
		return null;
	};

	const editStatus = async (status, database) => {
		let flag = false, statuses = await getStatuses(database);

		if(statuses) {
			statuses.forEach(e => {
				if(e.ID == status.ID) {
					if(status.NAME  || typeof status.NAME === 'string') {
						e.NAME = status.NAME;
					}
					flag = true;
					model.setStatuses(database, statuses);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `Status #${status.ID} update`} : {status: `Status #${status.ID} not found`};
	};

	const deleteStatus = async (statusInfo, database) => {
		let i = -1, aux1, aux2, statuses = await getStatuses(database);
		if(statuses) {
			statuses.forEach((e, j) => {
				if(e.ID == statusInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = statuses.splice(i);
				aux2 = aux1.splice(1);
				statuses = statuses.concat(aux2);
				statuses = await model.setStatuses(database, statuses);
			}
			else {
				statuses = null;
			}
		}
		return statuses;
	};

	return {
		getStatuses,
		getStatus,
		createStatus,
		editStatus,
		deleteStatus
	};
}