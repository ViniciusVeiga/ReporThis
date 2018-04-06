'use strict';

let locations = [];
let status = {};
let list;

const create = () => {
	$.ajax({
		url: '/api/location',
		type: 'POST',
		dataType: 'json',
		data: {
			NAME: $("#newName").val(),
			DESCRIPTION: $("#newDescription").val(),
			X: $("#newX").val(),
			Y: $("#newY").val(),
			Z: $("#newZ").val(),
		},
		success: result => {
			console.log(result);
			status[result.ID] = {
				ID: result.ID,
				listing: true
			};
			getLocations();
		}
	});
}
const editLocation = id => {
	status[id].listing = false;
	refreshList(true);
};

const edit = id => {
	$.ajax({
		url: '/api/location',
		type: 'PUT',
		dataType: 'json',
		data: {
			ID: id,
			NAME: $(`#editName${id}`).val(),
			DESCRIPTION: $(`#editDescription${id}`).val(),
			X: $(`#editX${id}`).val(),
			Y: $(`#editY${id}`).val(),
			Z: $(`#editZ${id}`).val(),
		},
		success: result => {
			status[id].listing = true;
			getLocations();
		}
	})
};

const cancel = id => {
	status[id].listing = true;
	refreshList();
};

const deleteLocation = id => {
	$.ajax({
		url: '/api/location',
		type: 'DELETE',
		dataType: 'json',
		data: {
			ID: id
		},
		success: result => {
			getLocations();
		}
	});
};

const getLocations = resetStatus => {
	$.ajax({
		url: '/api/locations',
		type: 'GET',
		success: result => {
			locations = result;
			if(resetStatus) {
				locations.forEach(e => {
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

const buildTr = locations => {
	let trs = '';
	locations.forEach(e => {
		if(status[e.ID].listing) {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td>${e.NAME}</td>
					<td>${e.DESCRIPTION}</td>
					<td>${e.X}</td>
					<td>${e.Y}</td>
					<td>${e.Z}</td>
					<td><a onclick="editLocation(${e.ID})">Edit</a></td>
					<td><a onclick="deleteLocation(${e.ID})">Delete</a></td>
				</tr>
			`;
		}
		else {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td><input type="text" value="${e.NAME}" id="editName${e.ID}"></td>
					<td><input type="text" value="${e.DESCRIPTION}" id="editDescription${e.ID}"></td>
					<td><input type="text" value="${e.X}" id="editX${e.ID}"></td>
					<td><input type="text" value="${e.Y}" id="editY${e.ID}"></td>
					<td><input type="text" value="${e.Z}" id="editZ${e.ID}"></td>
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
			<td><input type="text" placeholder="Description" id="newDescription"></td>
			<td><input type="text" placeholder="X" id="newX"></td>
			<td><input type="text" placeholder="Y" id="newY"></td>
			<td><input type="text" placeholder="Z" id="newZ"></td>
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
			<th>Description</th>
			<th>X</th>
			<th>Y</th>
			<th>Z</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		${buildTr(locations)}
	`);
}

const init = () => {
	list = $("#list");
	getLocations(true);
}
