'use strict';

const model = require('./file_reportsModel')();

module.exports = () => {
	const isValidId = (file_reports, id) => {
		let isValidId = true;
		file_reports.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getFile_reports = async database => {
		return await model.getFile_reports(database);
	};

	const getFile_report = async (id, database) => {
		let file_report = {}, file_reports = await model.getFile_reports(database);
		if(file_reports) {
			file_reports.forEach(e => {
				if(e.ID == id) {
					file_report = e;
					return;
				}
			});
		}
		else {
			return null;
		}
		return file_report;
	};

	const createFile_report = async (file_report, database) => {
		let i = 1, file_reports = await getFile_reports(database);

		while(!isValidId(file_reports, file_reports.length + i)) {
			i--;
		}
		file_report.ID = file_reports.length + i;
		file_reports.push(file_report);

		if(await model.setFile_reports(database, file_reports)) {
			return file_reports[file_reports.length-1];
		}
		return null;
	};

	const editFile_report = async (file_report, database) => {
		let flag = false, file_reports = await getFile_reports(database);

		if(file_reports) {
			file_reports.forEach(e => {
				if(e.ID == file_report.ID) {
					if(file_report.REPORT_ID  || typeof file_report.REPORT_ID === 'string') {
						e.REPORT_ID = file_report.REPORT_ID;
					}
					if(file_report.FILE  || typeof file_report.FILE === 'string') {
						e.FILE = file_report.FILE;
					}
					flag = true;
					model.setFile_reports(database, file_reports);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `File_report #${file_report.ID} update`} : {status: `File_report #${file_report.ID} not found`};
	};

	const deleteFile_report = async (file_reportInfo, database) => {
		let i = -1, aux1, aux2, file_reports = await getFile_reports(database);
		if(file_reports) {
			file_reports.forEach((e, j) => {
				if(e.ID == file_reportInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = file_reports.splice(i);
				aux2 = aux1.splice(1);
				file_reports = file_reports.concat(aux2);
				file_reports = await model.setFile_reports(database, file_reports);
			}
			else {
				file_reports = null;
			}
		}
		return file_reports;
	};

	return {
		getFile_reports,
		getFile_report,
		createFile_report,
		editFile_report,
		deleteFile_report
	};
}