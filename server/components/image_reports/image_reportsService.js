'use strict';

const model = require('./image_reportsModel')();

module.exports = () => {
	const isValidId = (image_reports, id) => {
		let isValidId = true;
		image_reports.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getImage_reports = async database => {
		return await model.getImage_reports(database);
	};

	const getImage_report = async (id, database) => {
		let image_report = {}, image_reports = await model.getImage_reports(database);
		if(image_reports) {
			image_reports.forEach(e => {
				if(e.ID == id) {
					image_report = e;
					return;
				}
			});
		}
		else {
			return null;
		}
		return image_report;
	};

	const createImage_report = async (image_report, database) => {
		let i = 1, image_reports = await getImage_reports(database);

		while(!isValidId(image_reports, image_reports.length + i)) {
			i--;
		}
		image_report.ID = image_reports.length + i;
		image_reports.push(image_report);

		if(await model.setImage_reports(database, image_reports)) {
			return image_reports[image_reports.length-1];
		}
		return null;
	};

	const editImage_report = async (image_report, database) => {
		let flag = false, image_reports = await getImage_reports(database);

		if(image_reports) {
			image_reports.forEach(e => {
				if(e.ID == image_report.ID) {
					if(image_report.REPORT_ID  || typeof image_report.REPORT_ID === 'string') {
						e.REPORT_ID = image_report.REPORT_ID;
					}
					if(image_report.IMAGE  || typeof image_report.IMAGE === 'string') {
						e.IMAGE = image_report.IMAGE;
					}
					flag = true;
					model.setImage_reports(database, image_reports);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `Image_report #${image_report.ID} update`} : {status: `Image_report #${image_report.ID} not found`};
	};

	const deleteImage_report = async (image_reportInfo, database) => {
		let i = -1, aux1, aux2, image_reports = await getImage_reports(database);
		if(image_reports) {
			image_reports.forEach((e, j) => {
				if(e.ID == image_reportInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = image_reports.splice(i);
				aux2 = aux1.splice(1);
				image_reports = image_reports.concat(aux2);
				image_reports = await model.setImage_reports(database, image_reports);
			}
			else {
				image_reports = null;
			}
		}
		return image_reports;
	};

	return {
		getImage_reports,
		getImage_report,
		createImage_report,
		editImage_report,
		deleteImage_report
	};
}