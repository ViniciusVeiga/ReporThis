const getUsers = async connection => {
    const query = `SELECT * FROM REPORTHIS.USER`;
    try {
        return await connection.query(query);
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
};