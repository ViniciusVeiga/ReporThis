const _user = require('./user.model');

const Ajv = require('ajv');
const crypto = require('crypto');

const ajv = new Ajv({allErrors: true});

const getUsers = async (req, res) => {
    const users = await _user.getUsers(req.connection);
    if(users) {
        res.status(200).json({
            data: users,
        });
    }
    else {
        res.status(500);
    }
}

const byEmail = async (req, res) => {
    let email = req.params.id;

    if(typeof email === 'string') {
        const user = await _user.byEmail(email, req.connection);
        if(user) {
            res.status(200).json({
                data: user,
            });
        }
        else {
            res.status(500);
        }
    }
    else {
        res.status(400).end();
    }
}

const create = async (req, res) => {
    const user = req.body;
    const schema = {
        properties: {
            email: { type: "string", maxLength: 255, format: "email" },
            name: { type: "string", maxLength: 255 },
            registry: { type: "string", maxLength: 32 },
            password: { type: "string" }
        },
        required: ["email", "name", "password"],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);
    const valid = validate(user);

    if(valid) {
        user.password = encrypt(user.password, process.env.SALT);
        user = await _user.create(user, req.connection);
        if(user) {
            res.status(200).json({
                data: user,
            });
        }
        else {
            res.status(500);
        }
    }
    else {
        res.status(400).json({
            data: ajv.errorsText(validate.errors)
        });
    }
}

const authenticate = async (req, res) => {
    const user = req.body;
    const schema = {
        properties: {
            email: { type: "string", maxLength: 255, format: "email" },
            password: { type: "string" }
        },
        required: ["email", "password"],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);
    const valid = validate(user);

    encryptedPassword = encrypt(user.password, process.env.SALT);

    if(valid) {
        userInfo = await _user.byEmail(user.email, req.connection);
        if(userInfo) {
            if(userInfo.password) {
                if(userInfo.PASSWORD === encryptedPassword) {
                    res.status(200);
                }
            }
            res.status(401).end();
        }
        else {
            res.status(500);
        }
    }
    else {
        res.status(400).json({
            data: ajv.errorsText(validate.errors)
        });
    }
}

const encrypt = (password, salt) => {
    return crypto.createHmac('sha512', salt).update(password).digest('hex');
}

module.exports = {
    getUsers,
    byEmail,
    create,
    authenticate,
};
