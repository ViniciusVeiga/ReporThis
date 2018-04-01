'use strict';

module.exports = () => {
    const getUsers = (connection) => {
        return connection.users;
    };

    const getUser = (userInfo, connection) => {

    };

    const createUser = (user, connection) => {
        users = connection.users;
        users.push({
            ID: users.length + 1,
            EMAIL: user.email,
            NAME: user.name,
            REGISTRY: user.registry,
            PASSWORD: user.password 
        });
        return users[users.length-1];
    };

    const editUser = (user, connection) => {
        let users = connection.users;
        let flag = false;
        users.forEach(e => {
            if(e.ID === user.id) {
                if(user.email) {
                    e.EMAIL = user.email;
                }
                if(user.name) {
                    e.NAME = user.name;
                }
                if(user.registry) {
                    e.REGISTRY = user.registry;
                }
                if(user.password) {
                    e.PASSWORD = user.password
                }
                flag = true;
            } 
        });
        return flag ? {status: `User #${user.id} update`} : {status: `User #${user.id} not found`};
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