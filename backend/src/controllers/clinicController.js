const Clinic = require('../models/Clinic');

const { createToken } = require('../utils/jwt');
const { encryptPassword } = require('../utils/bcrypt');
const { isUndefined, invalidPassword, invalidCnpj } = require('../utils/validateInput');

const createClinic = async (req, res) => {
    const { cnpj, razaoSocial, email, telefone, senha } = req.body;

    if (invalidCnpj(cnpj) || isUndefined(razaoSocial) || isUndefined(email) || isUndefined(telefone) || invalidPassword(senha)) {
        res.status(400).json();
        return
    }

    const clinic = new Clinic.Clinic(cnpj.trim(), razaoSocial.trim(), email.trim(), telefone.trim(), await encryptPassword(senha.trim()));

    // need to add database logic 

    const token = createToken(clinic);

    res.status(200).json({ token: token });
};

module.exports = {
    createClinic,
};
