const user = require('./user.model');

const getUsers = async (req, res) => {
    const users = await user.getUsers(req.connection);
    if(users) {
        res.status(200).json({
            data: users,
        });
    }
    else {
        res.status(500);
    }
}

module.exports = {
    getUsers,
};
