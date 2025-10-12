require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRETKEY;

const createToken = (clinic) => {
    return jwt.sign({ cnpj: clinic.cnpj }, secretKey, {expiresIn: '7 days'});
}

const getSubjectFromToken = (token) => {
    return jwt.verify(token, secretKey);
}

module.exports = { createToken, getSubjectFromToken };
