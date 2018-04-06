'use strict';

let image_reports = [];
let status = {};
let list;

const create = () => {
	$.ajax({
		url: '/api/image_report',
		type: 'POST',
		dataType: 'json',
		data: {
			REPORT_ID: $("#newReport_id").val(),
			IMAGE: $("#newImage").val(),
		},
		success: result => {
			console.log(result);
			status[result.ID] = {
				ID: result.ID,
				listing: true
			};
			getImage_reports();
		}
	});
}
const editImage_report = id => {
	status[id].listing = false;
	refreshList(true);
};

const edit = id => {
	$.ajax({
		url: '/api/image_report',
		type: 'PUT',
		dataType: 'json',
		data: {
			ID: id,
			REPORT_ID: $(`#editReport_id${id}`).val(),
			IMAGE: $(`#editImage${id}`).val(),
		},
		success: result => {
			status[id].listing = true;
			getImage_reports();
		}
	})
};

const cancel = id => {
	status[id].listing = true;
	refreshList();
};

const deleteImage_report = id => {
	$.ajax({
		url: '/api/image_report',
		type: 'DELETE',
		dataType: 'json',
		data: {
			ID: id
		},
		success: result => {
			getImage_reports();
		}
	});
};

const getImage_reports = resetStatus => {
	$.ajax({
		url: '/api/image_reports',
		type: 'GET',
		success: result => {
			image_reports = result;
			if(resetStatus) {
				image_reports.forEach(e => {
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

const buildTr = image_reports => {
	let trs = '';
	image_reports.forEach(e => {
		if(status[e.ID].listing) {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td>${e.REPORT_ID}</td>
					<td>${e.IMAGE}</td>
					<td><a onclick="editImage_report(${e.ID})">Edit</a></td>
					<td><a onclick="deleteImage_report(${e.ID})">Delete</a></td>
				</tr>
			`;
		}
		else {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td><input type="text" value="${e.REPORT_ID}" id="editReport_id${e.ID}"></td>
					<td><input type="text" value="${e.IMAGE}" id="editImage${e.ID}"></td>
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
			<td><input type="text" placeholder="Image" id="newImage"></td>
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
			<th>Image</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		${buildTr(image_reports)}
	`);
}

const init = () => {
	list = $("#list");
	getImage_reports(true);
}
