'use strict';

let statuss = [];
let status = {};
let list;

const create = () => {
	$.ajax({
		url: '/api/status',
		type: 'POST',
		dataType: 'json',
		data: {
			NAME: $("#newName").val(),
		},
		success: result => {
			console.log(result);
			status[result.ID] = {
				ID: result.ID,
				listing: true
			};
			getStatuss();
		}
	});
}
const editStatus = id => {
	status[id].listing = false;
	refreshList(true);
};

const edit = id => {
	$.ajax({
		url: '/api/status',
		type: 'PUT',
		dataType: 'json',
		data: {
			ID: id,
			NAME: $(`#editName${id}`).val(),
		},
		success: result => {
			status[id].listing = true;
			getStatuss();
		}
	})
};

const cancel = id => {
	status[id].listing = true;
	refreshList();
};

const deleteStatus = id => {
	$.ajax({
		url: '/api/status',
		type: 'DELETE',
		dataType: 'json',
		data: {
			ID: id
		},
		success: result => {
			getStatuss();
		}
	});
};

const getStatuss = resetStatus => {
	$.ajax({
		url: '/api/statuss',
		type: 'GET',
		success: result => {
			statuss = result;
			if(resetStatus) {
				statuss.forEach(e => {
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

const buildTr = statuss => {
	let trs = '';
	statuss.forEach(e => {
		if(status[e.ID].listing) {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td>${e.NAME}</td>
					<td><a onclick="editStatus(${e.ID})">Edit</a></td>
					<td><a onclick="deleteStatus(${e.ID})">Delete</a></td>
				</tr>
			`;
		}
		else {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td><input type="text" value="${e.NAME}" id="editName${e.ID}"></td>
					<td><a onclick="edit(${e.ID})">Save</a></td>
					<td><a onclick="cancel(${e.ID})">Cancel</a></td>
				</tr>
			`;
		}
	})
	trs += `
		<tr>
			<td></td>
			<td><input type="text" placeholder="Name" id="newName"></td>
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
			<th>Name</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		${buildTr(statuss)}
	`);
}

const init = () => {
	list = $("#list");
	getStatuss(true);
}
