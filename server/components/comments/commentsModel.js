'use strict';

module.exports = () => {
	const getComments = async database => {
		let comments = [];
		try {
			comments = JSON.parse(await database.read()).comments;
		} catch(err) {
			console.log(err);
			return null;
		}
		return comments ? comments : [];
	};

	const setComments = async (database, comments) => {
		let data = {}, comment = {};
		try {
			data = JSON.parse(await database.read());
			data.comments = comments;
			await database.write(JSON.stringify(data));
		} catch(err) {
			console.log(err);
			return false;
		}
		return true;
	};
	
	return {
		getComments,
		setComments
	};
}