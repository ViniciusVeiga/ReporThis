'use strict';

let reports = [];
let status = {};
let list;

const create = () => {
	$.ajax({
		url: '/api/report',
		type: 'POST',
		dataType: 'json',
		data: {
			OWNER_ID: $("#newOwner_id").val(),
			MODERATOR_ID: $("#newModerator_id").val(),
			CATEGORY_ID: $("#newCategory_id").val(),
			STATUS_ID: $("#newStatus_id").val(),
			LOCATION_ID: $("#newLocation_id").val(),
			TITLE: $("#newTitle").val(),
			DESCRIPTION: $("#newDescription").val(),
			VISUZALIZATIONS: $("#newVisuzalizations").val(),
			APROVED: $("#newAproved").val(),
			CREATED: $("#newCreated").val(),
		},
		success: result => {
			console.log(result);
			status[result.ID] = {
				ID: result.ID,
				listing: true
			};
			get0s();
		}
	});
}
const edit0 = id => {
	status[id].listing = false;
	refreshList(true);
};

const edit = id => {
	$.ajax({
		url: '/api/report',
		type: 'PUT',
		dataType: 'json',
		data: {
			ID: id,
			OWNER_ID: $(`#editOwner_id${id}`).val(),
			MODERATOR_ID: $(`#editModerator_id${id}`).val(),
			CATEGORY_ID: $(`#editCategory_id${id}`).val(),
			STATUS_ID: $(`#editStatus_id${id}`).val(),
			LOCATION_ID: $(`#editLocation_id${id}`).val(),
			TITLE: $(`#editTitle${id}`).val(),
			DESCRIPTION: $(`#editDescription${id}`).val(),
			VISUZALIZATIONS: $(`#editVisuzalizations${id}`).val(),
			APROVED: $(`#editAproved${id}`).val(),
			CREATED: $(`#editCreated${id}`).val(),
		},
		success: result => {
			status[id].listing = true;
			get0s();
		}
	})
};

const cancel = id => {
	status[id].listing = true;
	refreshList();
};

const delete0 = id => {
	$.ajax({
		url: '/api/report',
		type: 'DELETE',
		dataType: 'json',
		data: {
			ID: id
		},
		success: result => {
			get0s();
		}
	});
};

const get0s = resetStatus => {
	$.ajax({
		url: '/api/reports',
		type: 'GET',
		success: result => {
			reports = result;
			if(resetStatus) {
				reports.forEach(e => {
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

const buildTr = reports => {
	let trs = '';
	reports.forEach(e => {
		if(status[e.ID].listing) {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td>${e.OWNER_ID}</td>
					<td>${e.MODERATOR_ID}</td>
					<td>${e.CATEGORY_ID}</td>
					<td>${e.STATUS_ID}</td>
					<td>${e.LOCATION_ID}</td>
					<td>${e.TITLE}</td>
					<td>${e.DESCRIPTION}</td>
					<td>${e.VISUZALIZATIONS}</td>
					<td>${e.APROVED}</td>
					<td>${e.CREATED}</td>
					<td><a onclick="edit0(${e.ID})">Edit</a></td>
					<td><a onclick="delete0(${e.ID})">Delete</a></td>
				</tr>
			`;
		}
		else {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td><input type="text" value="${e.OWNER_ID}" id="editOwner_id${e.ID}"></td>
					<td><input type="text" value="${e.MODERATOR_ID}" id="editModerator_id${e.ID}"></td>
					<td><input type="text" value="${e.CATEGORY_ID}" id="editCategory_id${e.ID}"></td>
					<td><input type="text" value="${e.STATUS_ID}" id="editStatus_id${e.ID}"></td>
					<td><input type="text" value="${e.LOCATION_ID}" id="editLocation_id${e.ID}"></td>
					<td><input type="text" value="${e.TITLE}" id="editTitle${e.ID}"></td>
					<td><input type="text" value="${e.DESCRIPTION}" id="editDescription${e.ID}"></td>
					<td><input type="text" value="${e.VISUZALIZATIONS}" id="editVisuzalizations${e.ID}"></td>
					<td><input type="text" value="${e.APROVED}" id="editAproved${e.ID}"></td>
					<td><input type="text" value="${e.CREATED}" id="editCreated${e.ID}"></td>
					<td><a onclick="edit(${e.ID})">Save</a></td>
					<td><a onclick="cancel(${e.ID})">Cancel</a></td>
				</tr>
			`;
		}
	})
	trs += `
		<tr>
			<td></td>
			<td><input type="text" placeholder="Owner_id" id="newOwner_id"></td>
			<td><input type="text" placeholder="Moderator_id" id="newModerator_id"></td>
			<td><input type="text" placeholder="Category_id" id="newCategory_id"></td>
			<td><input type="text" placeholder="Status_id" id="newStatus_id"></td>
			<td><input type="text" placeholder="Location_id" id="newLocation_id"></td>
			<td><input type="text" placeholder="Title" id="newTitle"></td>
			<td><input type="text" placeholder="Description" id="newDescription"></td>
			<td><input type="text" placeholder="Visuzalizations" id="newVisuzalizations"></td>
			<td><input type="text" placeholder="Aproved" id="newAproved"></td>
			<td><input type="text" placeholder="Created" id="newCreated"></td>
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
			<th>Owner_id</th>
			<th>Moderator_id</th>
			<th>Category_id</th>
			<th>Status_id</th>
			<th>Location_id</th>
			<th>Title</th>
			<th>Description</th>
			<th>Visuzalizations</th>
			<th>Aproved</th>
			<th>Created</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		${buildTr(reports)}
	`);
}

const init = () => {
	list = $("#list");
	get0s(true);
}
