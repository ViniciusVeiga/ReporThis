'use strict';

module.exports = () => {
	const getFile_comments = async database => {
		let file_comments = [];
		try {
			file_comments = JSON.parse(await database.read()).file_comments;
		} catch(err) {
			console.log(err);
			return null;
		}
		return file_comments ? file_comments : [];
	};

	const setFile_comments = async (database, file_comments) => {
		let data = {}, file_comment = {};
		try {
			data = JSON.parse(await database.read());
			data.file_comments = file_comments;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getFile_comments,
		setFile_comments
	};
}