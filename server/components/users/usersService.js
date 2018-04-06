'use strict';

const model = require('./usersModel')();

module.exports = () => {
    const isValidId = (users, id) => {
        let isValidId = true;
        users.forEach(e => {
            if (e.ID == id) {
                isValidId = false;
            }
        });
        return isValidId;
    }

    const getUsers = async database => {
        return await model.getUsers(database);
    };

    const getUser = async (id, database) => {
        let user = {}, users = await model.getUsers(database);
        if(users) {
            users.forEach(e => {
                if(e.ID == id) {
                    user = e;
                    return;
                }
            });
        }
        else {
            return null;
        }
        return user;
    };

    const createUser = async (user, database) => {
        let i = 1, users = await getUsers(database);

        while(!isValidId(users, users.length + i)) {
            i--;
        }
        user.ID = users.length + i;
        users.push(user);

        if(await model.setUsers(database, users)) {
            return users[users.length-1];
        }
        return null;
    };

    const editUser = async (user, database) => {
        let flag = false, users = await getUsers(database);

        if(users) {
            users.forEach(e => {
                if(e.ID == user.ID) {
                    if(user.EMAIL || typeof user.EMAIL === 'string') {
                        e.EMAIL = user.EMAIL;
                    }
                    if(user.NAME || typeof user.EMAIL === 'string') {
                        e.NAME = user.NAME;
                    }
                    if(user.REGISTRY || typeof user.EMAIL === 'string') {
                        e.REGISTRY = user.REGISTRY;
                    }
                    if(user.PASSWORD || typeof user.EMAIL === 'string') {
                        e.PASSWORD = user.PASSWORD;
                    }
                    flag = true;
                    model.setUsers(database, users);
                }
            });
        }
        else {
            return null;
        }
        
        return flag ? {status: `User #${user.ID} update`} : {status: `User #${user.ID} not found`};
    };

    const deleteUser = async (userInfo, database) => {
        let i = -1, aux1, aux2, users = await getUsers(database);
        if(users) {
            users.forEach((e, j) => {
                if(e.ID == userInfo.ID) {
                    i = j;
                    return;
                }
            });
            if(i !== -1) {
                aux1 = users.splice(i);
                aux2 = aux1.splice(1);
                users = users.concat(aux2);
                users = await model.setUsers(database, users);
            }
            else {
                users = null;
            }
        }
        return users;
    };

    return {
        getUsers,
        getUser,
        createUser,
        editUser,
        deleteUser
    };
}