const User = require('../models/User');

const { createToken } = require('../utils/jwt');
const { encryptPassword, comparePassword } = require('../utils/bcrypt');
const { isUndefined, invalidPassword, invalidEmail } = require('../utils/validateInput');

const register = async (req, res) => {
    const { clinic_id, nome, email, password, role } = req.body;

    if (isUndefined(clinic_id) || isUndefined(nome) || invalidEmail(email) || isUndefined(role) || invalidPassword(password)) {
        res.status(400).json();
        return
    }

    const user = new User.User(clinic_id.trim(), nome.trim(), email.trim(), role.trim(), await encryptPassword(password.trim()));

    user.save();

    const token = createToken(user);

    res.status(200).json({ token: token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (invalidEmail(email) || invalidPassword(password)) {
        res.status(400).json();
        return
    }

    const user = new User.User();
    await user.findByEmail(email)

    if (!await comparePassword(password, user.password)) {
        res.status(400).json();
        return
    }

    const token = createToken(user);

    res.status(200).json({ token: token });
};

module.exports = {
    register,
    login,
};
