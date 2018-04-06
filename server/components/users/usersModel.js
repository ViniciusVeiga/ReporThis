'use strict';

module.exports = () => {
    const getUsers = async database => {
        let users = [];
        try {
            users = JSON.parse(await database.read()).users;
        } catch(err) {
            console.log(err);
            return null;
        }
        return users;
    };

    const setUsers = async (database, users) => {
        let data = {}, user = {};
        try {
            data = JSON.parse(await database.read());
            data.users = users;
            await database.write(JSON.stringify(data));
        } catch(err) {
            console.log(err);
            return false;
        }
        return true;
    };
    
    return {
        getUsers,
        setUsers
    };
}