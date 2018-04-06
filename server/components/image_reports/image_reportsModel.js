'use strict';

module.exports = () => {
	const getImage_reports = async database => {
		let image_reports = [];
		try {
			image_reports = JSON.parse(await database.read()).image_reports;
		} catch(err) {
			console.log(err);
			return null;
		}
		return image_reports ? image_reports : [];
	};

	const setImage_reports = async (database, image_reports) => {
		let data = {}, image_report = {};
		try {
			data = JSON.parse(await database.read());
			data.image_reports = image_reports;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getImage_reports,
		setImage_reports
	};
}