'use strict';

let file_comments = [];
let status = {};
let list;

const create = () => {
	$.ajax({
		url: '/api/file_comment',
		type: 'POST',
		dataType: 'json',
		data: {
			COMMENT_ID: $("#newComment_id").val(),
			FILE: $("#newFile").val(),
		},
		success: result => {
			console.log(result);
			status[result.ID] = {
				ID: result.ID,
				listing: true
			};
			getFile_comments();
		}
	});
}
const editFile_comment = id => {
	status[id].listing = false;
	refreshList(true);
};

const edit = id => {
	$.ajax({
		url: '/api/file_comment',
		type: 'PUT',
		dataType: 'json',
		data: {
			ID: id,
			COMMENT_ID: $(`#editComment_id${id}`).val(),
			FILE: $(`#editFile${id}`).val(),
		},
		success: result => {
			status[id].listing = true;
			getFile_comments();
		}
	})
};

const cancel = id => {
	status[id].listing = true;
	refreshList();
};

const deleteFile_comment = id => {
	$.ajax({
		url: '/api/file_comment',
		type: 'DELETE',
		dataType: 'json',
		data: {
			ID: id
		},
		success: result => {
			getFile_comments();
		}
	});
};

const getFile_comments = resetStatus => {
	$.ajax({
		url: '/api/file_comments',
		type: 'GET',
		success: result => {
			file_comments = result;
			if(resetStatus) {
				file_comments.forEach(e => {
					status[e.ID] = {
						ID: e.ID,
						listing: true
					};
				});
			}
			refreshList();
		}
	});
};

const buildTr = file_comments => {
	let trs = '';
	file_comments.forEach(e => {
		if(status[e.ID].listing) {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td>${e.COMMENT_ID}</td>
					<td>${e.FILE}</td>
					<td><a onclick="editFile_comment(${e.ID})">Edit</a></td>
					<td><a onclick="deleteFile_comment(${e.ID})">Delete</a></td>
				</tr>
			`;
		}
		else {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td><input type="text" value="${e.COMMENT_ID}" id="editComment_id${e.ID}"></td>
					<td><input type="text" value="${e.FILE}" id="editFile${e.ID}"></td>
					<td><a onclick="edit(${e.ID})">Save</a></td>
					<td><a onclick="cancel(${e.ID})">Cancel</a></td>
				</tr>
			`;
		}
	})
	trs += `
		<tr>
			<td></td>
			<td><input type="text" placeholder="Comment_id" id="newComment_id"></td>
			<td><input type="text" placeholder="File" id="newFile"></td>
			<td><a onclick="create()">Create</a></td>
			<td></td>
		<tr>
	`;
	return trs;
};

const refreshList = () => {
	list.html(`
		<tr>
			<th>ID</th>
			<th>Comment_id</th>
			<th>File</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		${buildTr(file_comments)}
	`);
}

const init = () => {
	list = $("#list");
	getFile_comments(true);
}
