const Clinic = require('../models/Clinic');

const { isUndefined, invalidCnpj, invalidEmail } = require('../utils/validateInput');

const createClinic = async (req, res) => {
    const { cnpj, razaoSocial, email, telefone } = req.body;

    if (invalidCnpj(cnpj) || isUndefined(razaoSocial) || invalidEmail(email) || isUndefined(telefone)) {
        res.status(400).json();
        return
    }

    const clinic = new Clinic.Clinic(cnpj.trim(), razaoSocial.trim(), email.trim(), telefone.trim());

    clinic.save();

    res.status(200).json();
};

module.exports = {
    createClinic,
};
