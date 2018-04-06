'use strict';

const model = require('./commentsModel')();

module.exports = () => {
	const isValidId = (comments, id) => {
		let isValidId = true;
		comments.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getComments = async database => {
		return await model.getComments(database);
	};

	const getComment = async (id, database) => {
		let comment = {}, comments = await model.getComments(database);
		if(comments) {
			comments.forEach(e => {
				if(e.ID == id) {
					comment = e;
					return;
				}
			});
		}
		else {
			return null;
		}
		return comment;
	};

	const createComment = async (comment, database) => {
		let i = 1, comments = await getComments(database);

		while(!isValidId(comments, comments.length + i)) {
			i--;
		}
		comment.ID = comments.length + i;
		comments.push(comment);

		if(await model.setComments(database, comments)) {
			return comments[comments.length-1];
		}
		return null;
	};

	const editComment = async (comment, database) => {
		let flag = false, comments = await getComments(database);

		if(comments) {
			comments.forEach(e => {
				if(e.ID == comment.ID) {
					if(comment.REPORT_ID  || typeof comment.REPORT_ID === 'string') {
						e.REPORT_ID = comment.REPORT_ID;
					}
					if(comment.USER_ID  || typeof comment.USER_ID === 'string') {
						e.USER_ID = comment.USER_ID;
					}
					if(comment.CONTENT  || typeof comment.CONTENT === 'string') {
						e.CONTENT = comment.CONTENT;
					}
					if(comment.COMMENTED  || typeof comment.COMMENTED === 'string') {
						e.COMMENTED = comment.COMMENTED;
					}
					flag = true;
					model.setComments(database, comments);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `Comment #${comment.ID} update`} : {status: `Comment #${comment.ID} not found`};
	};

	const deleteComment = async (commentInfo, database) => {
		let i = -1, aux1, aux2, comments = await getComments(database);
		if(comments) {
			comments.forEach((e, j) => {
				if(e.ID == commentInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = comments.splice(i);
				aux2 = aux1.splice(1);
				comments = comments.concat(aux2);
				comments = await model.setComments(database, comments);
			}
			else {
				comments = null;
			}
		}
		return comments;
	};

	return {
		getComments,
		getComment,
		createComment,
		editComment,
		deleteComment
	};
}