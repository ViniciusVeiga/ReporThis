'use strict';

const model = require('./statussModel')();

module.exports = () => {
	const isValidId = (statuss, id) => {
		let isValidId = true;
		statuss.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getStatuss = async database => {
		return await model.getStatuss(database);
	};

	const getStatus = async (id, database) => {
		let status = {}, statuss = await model.getStatuss(database);
		if(statuss) {
			statuss.forEach(e => {
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
		let i = 1, statuss = await getStatuss(database);

		while(!isValidId(statuss, statuss.length + i)) {
			i--;
		}
		status.ID = statuss.length + i;
		statuss.push(status);

		if(await model.setStatuss(database, statuss)) {
			return statuss[statuss.length-1];
		}
		return null;
	};

	const editStatus = async (status, database) => {
		let flag = false, statuss = await getStatuss(database);

		if(statuss) {
			statuss.forEach(e => {
				if(e.ID == status.ID) {
					if(status.NAME  || typeof status.NAME === 'string') {
						e.NAME = status.NAME;
					}
					flag = true;
					model.setStatuss(database, statuss);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `Status #${status.ID} update`} : {status: `Status #${status.ID} not found`};
	};

	const deleteStatus = async (statusInfo, database) => {
		let i = -1, aux1, aux2, statuss = await getStatuss(database);
		if(statuss) {
			statuss.forEach((e, j) => {
				if(e.ID == statusInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = statuss.splice(i);
				aux2 = aux1.splice(1);
				statuss = statuss.concat(aux2);
				statuss = await model.setStatuss(database, statuss);
			}
			else {
				statuss = null;
			}
		}
		return statuss;
	};

	return {
		getStatuss,
		getStatus,
		createStatus,
		editStatus,
		deleteStatus
	};
}