'use strict';

let comments = [];
let status = {};
let list;

const create = () => {
	$.ajax({
		url: '/api/comment',
		type: 'POST',
		dataType: 'json',
		data: {
			REPORT_ID: $("#newReport_id").val(),
			USER_ID: $("#newUser_id").val(),
			CONTENT: $("#newContent").val(),
			COMMENTED: $("#newCommented").val(),
		},
		success: result => {
			console.log(result);
			status[result.ID] = {
				ID: result.ID,
				listing: true
			};
			getComments();
		}
	});
}
const editComment = id => {
	status[id].listing = false;
	refreshList(true);
};

const edit = id => {
	$.ajax({
		url: '/api/comment',
		type: 'PUT',
		dataType: 'json',
		data: {
			ID: id,
			REPORT_ID: $(`#editReport_id${id}`).val(),
			USER_ID: $(`#editUser_id${id}`).val(),
			CONTENT: $(`#editContent${id}`).val(),
			COMMENTED: $(`#editCommented${id}`).val(),
		},
		success: result => {
			status[id].listing = true;
			getComments();
		}
	})
};

const cancel = id => {
	status[id].listing = true;
	refreshList();
};

const deleteComment = id => {
	$.ajax({
		url: '/api/comment',
		type: 'DELETE',
		dataType: 'json',
		data: {
			ID: id
		},
		success: result => {
			getComments();
		}
	});
};

const getComments = resetStatus => {
	$.ajax({
		url: '/api/comments',
		type: 'GET',
		success: result => {
			comments = result;
			if(resetStatus) {
				comments.forEach(e => {
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

const buildTr = comments => {
	let trs = '';
	comments.forEach(e => {
		if(status[e.ID].listing) {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td>${e.REPORT_ID}</td>
					<td>${e.USER_ID}</td>
					<td>${e.CONTENT}</td>
					<td>${e.COMMENTED}</td>
					<td><a onclick="editComment(${e.ID})">Edit</a></td>
					<td><a onclick="deleteComment(${e.ID})">Delete</a></td>
				</tr>
			`;
		}
		else {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td><input type="text" value="${e.REPORT_ID}" id="editReport_id${e.ID}"></td>
					<td><input type="text" value="${e.USER_ID}" id="editUser_id${e.ID}"></td>
					<td><input type="text" value="${e.CONTENT}" id="editContent${e.ID}"></td>
					<td><input type="text" value="${e.COMMENTED}" id="editCommented${e.ID}"></td>
					<td><a onclick="edit(${e.ID})">Save</a></td>
					<td><a onclick="cancel(${e.ID})">Cancel</a></td>
				</tr>
			`;
		}
	})
	trs += `
		<tr>
			<td></td>
			<td><input type="text" placeholder="Report_id" id="newReport_id"></td>
			<td><input type="text" placeholder="User_id" id="newUser_id"></td>
			<td><input type="text" placeholder="Content" id="newContent"></td>
			<td><input type="text" placeholder="Commented" id="newCommented"></td>
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
			<th>Report_id</th>
			<th>User_id</th>
			<th>Content</th>
			<th>Commented</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		${buildTr(comments)}
	`);
}

const init = () => {
	list = $("#list");
	getComments(true);
}
