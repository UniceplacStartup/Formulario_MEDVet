const Clinic = require('../models/Clinic');

const { isUndefined, invalidCnpj, invalidEmail } = require('../utils/validateInput');

const createClinic = async (req, res) => {

    const clinic = new Clinic.Clinic(cnpj.trim(), razaoSocial.trim(), email.trim(), telefone.trim());

    try {
        await clinic.save(); 
        res.status(200).json();
    } catch (error) {
        console.error('Erro ao salvar clínica:', error);

        res.status(500).json({ message: "Erro ao cadastrar a clínica." }); 
    }
};

module.exports = {
    createClinic,
};
