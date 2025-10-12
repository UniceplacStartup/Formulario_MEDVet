const Clinic = require('../models/Clinic');
const bcrypt = require('bcrypt');

const { createToken } = require('../utils/jwt');

const createClinic = async (req, res) => {
    const { cnpj, razaoSocial, email, telefone, senha } = req.body;

    const salt = await bcrypt.genSalt(10);
    const clinic = new Clinic.Clinic(cnpj, razaoSocial, email, telefone, await bcrypt.hash(senha, salt));

    // need to add database logic 

    const token = createToken(clinic);

    res.status(200).json({ token: token });
};

module.exports = {
    createClinic,
};
