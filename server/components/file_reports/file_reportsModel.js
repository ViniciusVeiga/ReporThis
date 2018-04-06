'use strict';

module.exports = () => {
	const getFile_reports = async database => {
		let file_reports = [];
		try {
			file_reports = JSON.parse(await database.read()).file_reports;
		} catch(err) {
			console.log(err);
			return null;
		}
		return file_reports ? file_reports : [];
	};

	const setFile_reports = async (database, file_reports) => {
		let data = {}, file_report = {};
		try {
			data = JSON.parse(await database.read());
			data.file_reports = file_reports;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getFile_reports,
		setFile_reports
	};
}