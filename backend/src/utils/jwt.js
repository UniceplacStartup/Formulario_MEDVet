require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRETKEY;

const createToken = (user) => {
    return jwt.sign({ nome: user.nome, role: user.role }, secretKey, {expiresIn: '7 days'});
}

const getSubjectFromToken = (token) => {
    return jwt.verify(token, secretKey);
}

module.exports = { createToken, getSubjectFromToken };
