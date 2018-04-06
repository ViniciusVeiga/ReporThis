'use strict';

const model = require('./file_commentsModel')();

module.exports = () => {
	const isValidId = (file_comments, id) => {
		let isValidId = true;
		file_comments.forEach(e => {
			if (e.ID == id) {
				isValidId = false;
			}
		});
		return isValidId;
	}

	const getFile_comments = async database => {
		return await model.getFile_comments(database);
	};

	const getFile_comment = async (id, database) => {
		let file_comment = {}, file_comments = await model.getFile_comments(database);
		if(file_comments) {
			file_comments.forEach(e => {
				if(e.ID == id) {
					file_comment = e;
					return;
				}
			});
		}
		else {
			return null;
		}
		return file_comment;
	};

	const createFile_comment = async (file_comment, database) => {
		let i = 1, file_comments = await getFile_comments(database);

		while(!isValidId(file_comments, file_comments.length + i)) {
			i--;
		}
		file_comment.ID = file_comments.length + i;
		file_comments.push(file_comment);

		if(await model.setFile_comments(database, file_comments)) {
			return file_comments[file_comments.length-1];
		}
		return null;
	};

	const editFile_comment = async (file_comment, database) => {
		let flag = false, file_comments = await getFile_comments(database);

		if(file_comments) {
			file_comments.forEach(e => {
				if(e.ID == file_comment.ID) {
					if(file_comment.COMMENT_ID  || typeof file_comment.COMMENT_ID === 'string') {
						e.COMMENT_ID = file_comment.COMMENT_ID;
					}
					if(file_comment.FILE  || typeof file_comment.FILE === 'string') {
						e.FILE = file_comment.FILE;
					}
					flag = true;
					model.setFile_comments(database, file_comments);
				}
			});
		}
		else {
			return null;
		}
		
		return flag ? {status: `File_comment #${file_comment.ID} update`} : {status: `File_comment #${file_comment.ID} not found`};
	};

	const deleteFile_comment = async (file_commentInfo, database) => {
		let i = -1, aux1, aux2, file_comments = await getFile_comments(database);
		if(file_comments) {
			file_comments.forEach((e, j) => {
				if(e.ID == file_commentInfo.ID) {
					i = j;
					return;
				}
			});
			if(i !== -1) {
				aux1 = file_comments.splice(i);
				aux2 = aux1.splice(1);
				file_comments = file_comments.concat(aux2);
				file_comments = await model.setFile_comments(database, file_comments);
			}
			else {
				file_comments = null;
			}
		}
		return file_comments;
	};

	return {
		getFile_comments,
		getFile_comment,
		createFile_comment,
		editFile_comment,
		deleteFile_comment
	};
}