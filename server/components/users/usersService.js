'use strict';

const model = require('./usersModel')();

module.exports = () => {
    const getUsers = connection => {
        return model.getUsers(connection);
    };

    const getUser = (userInfo, connection) => {

    };

    const createUser = (user, connection) => {
        return model.createUser(user, connection);
    };

    const editUser = (user, connection) => {
        return model.editUser(user, connection);
    };

    const deleteUser = (user, connection) => {

    };

    return {
        getUsers: getUsers,
        getUser: getUser,
        createUser: createUser,
        editUser: editUser,
        deleteUser: deleteUser
    };
}