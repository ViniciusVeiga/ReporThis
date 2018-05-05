const getUsers = async connection => {
    const query = `SELECT * FROM REPORTHIS.USER`;
    try {
        return await connection.query(query);
    } catch(error) {
        console.log(error);
    }
}

const byEmail = async (email, connection) => {
    const query = {
        text: `SELECT * FROM REPORTHIS.USER WHERE EMAIL = $1`,
        values: [email],
    }
    try {
        return (await connection.query(query))[0];
    } catch(error) {
        console.log(error);
    }
}

const create = async (user, connection) => {
    let { email, name, password, registry } = user;
    registry = registry === undefined ? null : registry;
    const query = {
        text: `INSERT INTO REPORTHIS.USER (EMAIL, NAME, PASSWORD, REGISTRY) VALUES($1, $2, $3, $4) RETURNING ID`,
        values: [email, name, password, registry],
    };
    try {
        return (await connection.query(query))[0];
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    byEmail,
    create,
};