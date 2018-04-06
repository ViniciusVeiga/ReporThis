'use strict';

const model = require('./reportsModel')();

module.exports = () => {
	const isValidId = (reports, id) => {
		let isValidId = true;
		reports.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const get0s = async database => {
		return await model.get0s(database);
	};

	const get0 = async (id, database) => {
		let report = {}, reports = await model.get0s(database);
		if(reports) {
			reports.forEach(e => {
				if(e.ID == id) {
					report = e;
					return;
				}
			});
		}
		else {
			return null;
		}
		return report;
	};

	const create0 = async (report, database) => {
		let i = 1, reports = await get0s(database);

		while(!isValidId(reports, reports.length + i)) {
			i--;
		}
		report.ID = reports.length + i;
		reports.push(report);

		if(await model.set0s(database, reports)) {
			return reports[reports.length-1];
		}
		return null;
	};

	const edit0 = async (report, database) => {
		let flag = false, reports = await get0s(database);

		if(reports) {
			reports.forEach(e => {
				if(e.ID == report.ID) {
					if(report.OWNER_ID  || typeof report.OWNER_ID === 'string') {
						e.OWNER_ID = report.OWNER_ID;
					}
					if(report.MODERATOR_ID  || typeof report.MODERATOR_ID === 'string') {
						e.MODERATOR_ID = report.MODERATOR_ID;
					}
					if(report.CATEGORY_ID  || typeof report.CATEGORY_ID === 'string') {
						e.CATEGORY_ID = report.CATEGORY_ID;
					}
					if(report.STATUS_ID  || typeof report.STATUS_ID === 'string') {
						e.STATUS_ID = report.STATUS_ID;
					}
					if(report.LOCATION_ID  || typeof report.LOCATION_ID === 'string') {
						e.LOCATION_ID = report.LOCATION_ID;
					}
					if(report.TITLE  || typeof report.TITLE === 'string') {
						e.TITLE = report.TITLE;
					}
					if(report.DESCRIPTION  || typeof report.DESCRIPTION === 'string') {
						e.DESCRIPTION = report.DESCRIPTION;
					}
					if(report.VISUZALIZATIONS  || typeof report.VISUZALIZATIONS === 'string') {
						e.VISUZALIZATIONS = report.VISUZALIZATIONS;
					}
					if(report.APROVED  || typeof report.APROVED === 'string') {
						e.APROVED = report.APROVED;
					}
					if(report.CREATED  || typeof report.CREATED === 'string') {
						e.CREATED = report.CREATED;
					}
					flag = true;
					model.set0s(database, reports);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `0 #${report.ID} update`} : {status: `0 #${report.ID} not found`};
	};

	const delete0 = async (reportInfo, database) => {
		let i = -1, aux1, aux2, reports = await get0s(database);
		if(reports) {
			reports.forEach((e, j) => {
				if(e.ID == reportInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = reports.splice(i);
				aux2 = aux1.splice(1);
				reports = reports.concat(aux2);
				reports = await model.set0s(database, reports);
			}
			else {
				reports = null;
			}
		}
		return reports;
	};

	return {
		get0s,
		get0,
		create0,
		edit0,
		delete0
	};
}