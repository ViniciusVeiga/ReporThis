'use strict';

let file_reports = [];
let status = {};
let list;

const create = () => {
	$.ajax({
		url: '/api/file_report',
		type: 'POST',
		dataType: 'json',
		data: {
			REPORT_ID: $("#newReport_id").val(),
			FILE: $("#newFile").val(),
		},
		success: result => {
			console.log(result);
			status[result.ID] = {
				ID: result.ID,
				listing: true
			};
			getFile_reports();
		}
	});
}
const editFile_report = id => {
	status[id].listing = false;
	refreshList(true);
};

const edit = id => {
	$.ajax({
		url: '/api/file_report',
		type: 'PUT',
		dataType: 'json',
		data: {
			ID: id,
			REPORT_ID: $(`#editReport_id${id}`).val(),
			FILE: $(`#editFile${id}`).val(),
		},
		success: result => {
			status[id].listing = true;
			getFile_reports();
		}
	})
};

const cancel = id => {
	status[id].listing = true;
	refreshList();
};

const deleteFile_report = id => {
	$.ajax({
		url: '/api/file_report',
		type: 'DELETE',
		dataType: 'json',
		data: {
			ID: id
		},
		success: result => {
			getFile_reports();
		}
	});
};

const getFile_reports = resetStatus => {
	$.ajax({
		url: '/api/file_reports',
		type: 'GET',
		success: result => {
			file_reports = result;
			if(resetStatus) {
				file_reports.forEach(e => {
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

const buildTr = file_reports => {
	let trs = '';
	file_reports.forEach(e => {
		if(status[e.ID].listing) {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td>${e.REPORT_ID}</td>
					<td>${e.FILE}</td>
					<td><a onclick="editFile_report(${e.ID})">Edit</a></td>
					<td><a onclick="deleteFile_report(${e.ID})">Delete</a></td>
				</tr>
			`;
		}
		else {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td><input type="text" value="${e.REPORT_ID}" id="editReport_id${e.ID}"></td>
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
			<td><input type="text" placeholder="Report_id" id="newReport_id"></td>
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
			<th>Report_id</th>
			<th>File</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		${buildTr(file_reports)}
	`);
}

const init = () => {
	list = $("#list");
	getFile_reports(true);
}
