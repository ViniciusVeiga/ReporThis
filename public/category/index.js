'use strict';

let categories = [];
let status = {};
let list;

const create = () => {
	$.ajax({
		url: '/api/category',
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
			getCategories();
		}
	});
}
const editCategory = id => {
	status[id].listing = false;
	refreshList(true);
};

const edit = id => {
	$.ajax({
		url: '/api/category',
		type: 'PUT',
		dataType: 'json',
		data: {
			ID: id,
			NAME: $(`#editName${id}`).val(),
		},
		success: result => {
			status[id].listing = true;
			getCategories();
		}
	})
};

const cancel = id => {
	status[id].listing = true;
	refreshList();
};

const deleteCategory = id => {
	$.ajax({
		url: '/api/category',
		type: 'DELETE',
		dataType: 'json',
		data: {
			ID: id
		},
		success: result => {
			getCategories();
		}
	});
};

const getCategories = resetStatus => {
	$.ajax({
		url: '/api/categories',
		type: 'GET',
		success: result => {
			categories = result;
			if(resetStatus) {
				categories.forEach(e => {
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

const buildTr = categories => {
	let trs = '';
	categories.forEach(e => {
		if(status[e.ID].listing) {
			trs += `
				<tr>
					<td>${e.ID}</td>
					<td>${e.NAME}</td>
					<td><a onclick="editCategory(${e.ID})">Edit</a></td>
					<td><a onclick="deleteCategory(${e.ID})">Delete</a></td>
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
		${buildTr(categories)}
	`);
}

const init = () => {
	list = $("#list");
	getCategories(true);
}
