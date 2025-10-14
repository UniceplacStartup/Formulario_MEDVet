const Clinic = require('../models/Clinic');

const { createToken } = require('../utils/jwt');
const { encryptPassword } = require('../utils/bcrypt');
const { isNotUndefined, validatePassword, validateCnpj } = require('../utils/validateInput');

const createClinic = async (req, res) => {
    const { cnpj, razaoSocial, email, telefone, senha } = req.body;

    if (validateCnpj(cnpj) || isNotUndefined(razaoSocial) || isNotUndefined(email) || isNotUndefined(telefone) || validatePassword(senha)) {
        res.status(400).json();
        return
    }

    const clinic = new Clinic.Clinic(cnpj, razaoSocial, email, telefone, await encryptPassword(senha));

    // need to add database logic 

    const token = createToken(clinic);

    res.status(200).json({ token: token });
};

module.exports = {
    createClinic,
};
