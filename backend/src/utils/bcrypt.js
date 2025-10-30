const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const comparePassword = async (password, encryptedPassword) => {
    return await bcrypt.compare(password, encryptedPassword);
}

module.exports = { encryptPassword, comparePassword };
