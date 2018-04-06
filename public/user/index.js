'use strict';

let users = [];
let status = {};
let list;

const create = () => {
    $.ajax({
        url: '/api/user',
        type: 'POST',
        dataType: 'json',
        data: {
            EMAIL: $("#newEmail").val(),
            NAME: $("#newName").val(),
            REGISTRY: $("#newRegistry").val(),
            PASSWORD: $("#newPassword").val()
        },
        success: result => {
            console.log(result);
            status[result.ID] = {
                ID: result.ID,
                listing: true
            };
            getUsers();
        }
    });
}
const editUser = id => {
    status[id].listing = false;
    refreshList(true);
};

const edit = id => {
    $.ajax({
        url: '/api/user',
        type: 'PUT',
        dataType: 'json',
        data: {
            ID: id,
            EMAIL: $(`#editEmail${id}`).val(),
            NAME: $(`#editName${id}`).val(),
            REGISTRY: $(`#editRegistry${id}`).val(),
            PASSWORD: $(`#editPassword${id}`).val()
        },
        success: result => {
            status[id].listing = true;
            getUsers();
        }
    })
};

const cancel = id => {
    status[id].listing = true;
    refreshList();
};

const deleteUser = id => {
    $.ajax({
        url: '/api/user',
        type: 'DELETE',
        dataType: 'json',
        data: {
            ID: id
        },
        success: result => {
            getUsers();
        }
    });
};

const getUsers = resetStatus => {
    $.ajax({
        url: '/api/users',
        type: 'GET',
        success: result => {
            users = result;
            if(resetStatus) {
                users.forEach(e => {
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

const buildTr = users => {
    let trs = '';
    users.forEach(e => {
        if(status[e.ID].listing) {
            trs += `
                <tr>
                    <td>${e.ID}</td>
                    <td>${e.EMAIL}</td>
                    <td>${e.NAME}</td>
                    <td>${e.REGISTRY}</td>
                    <td>${e.PASSWORD}</td>
                    <td><a onclick="editUser(${e.ID})">Edit</a></td>
                    <td><a onclick="deleteUser(${e.ID})">Delete</a></td>
                </tr>
            `;
        }
        else {
            trs += `
                <tr>
                    <td>${e.ID}</td>
                    <td><input type="text" value="${e.EMAIL}" id="editEmail${e.ID}"></td>
                    <td><input type="text" value="${e.NAME}" id="editName${e.ID}"></td>
                    <td><input type="text" value="${e.REGISTRY}" id="editRegistry${e.ID}"></td>
                    <td><input type="text" value="${e.PASSWORD}" id="editPassword${e.ID}"></td>
                    <td><a onclick="edit(${e.ID})">Save</a></td>
                    <td><a onclick="cancel(${e.ID})">Cancel</a></td>
                </tr>
            `;
        }
    })
    trs += `
        <tr>
            <td></td>
            <td><input type="text" placeholder="Email" id="newEmail"></td>
            <td><input type="text" placeholder="Name" id="newName"></td>
            <td><input type="text" placeholder="Registry" id="newRegistry"></td>
            <td><input type="text" placeholder="Password" id="newPassword"></td>
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
            <th>Email</th>
            <th>Name</th>
            <th>Registry</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        ${buildTr(users)}
    `);
}

const init = () => {
    list = $("#list");
    getUsers(true);
}
