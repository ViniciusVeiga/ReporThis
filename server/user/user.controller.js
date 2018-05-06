const _user = require('./user.model');

const Ajv = require('ajv');
const crypto = require('crypto');

const ajv = new Ajv({allErrors: true});

const getUsers = async (req, res) => {
    const users = await _user.getUsers(req.connection);
    if(users !== -1) {
        users.forEach(e => {
            delete e.password;
        })
        res.status(200).json({
            data: users,
        });
    }
    else {
        res.status(500).end();
    }
}

const byEmail = async (req, res) => {
    let email = req.params.email;

    if(typeof email === 'string') {
        const user = await _user.byEmail(email, req.connection);
        if(user !== -1) {
            if(user) {
                delete user.password;
            }
            res.status(200).json({
                data: user,
            });
        }
        else {
            res.status(500).end();
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
            name: { type: "string", minLength: 2, maxLength: 255 },
            registry: { type: "string", minLength: 1, maxLength: 32 },
            password: { type: "string", minLength: 1 }
        },
        required: ["email", "name", "password"],
        additionalProperties: false
    };

    if(user) {
        user.name = user.name && typeof user.name === 'string' ? user.name.trim() : user.name;
    }

    const validate = ajv.compile(schema);
    const valid = validate(user);

    if(valid) {
        user.password = encrypt(user.password, process.env.SALT);
        const userId = await _user.create(user, req.connection);
        if(userId !== -1 && userId !== -23505) {
            res.status(200).json({
                data: userId,
            });
        }
        else if(userId === -23505) {
            res.status(400).json({
                data: {
                    error: "23505",
                    text: "Email already exists."
                }
            })
        }
        else {
            res.status(500).end();
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

    if(valid) {
        let encryptedPassword = encrypt(user.password, process.env.SALT);
        userInfo = await _user.byEmail(user.email, req.connection);
        if(userInfo !== -1) {
            if(userInfo) {
                if(userInfo.password === encryptedPassword) {
                    res.status(200).end();
                }
            }
            res.status(401).end();
        }
        else {
            res.status(500).end();
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
