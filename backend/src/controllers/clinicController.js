const Clinic = require('../models/Clinic');

const { isUndefined, invalidCnpj, invalidEmail } = require('../utils/validateInput');

const createClinic = async (req, res) => {
    try {
        const { cnpj, razaoSocial, email, telefone } = req.body;

        if (invalidCnpj(cnpj) || isUndefined(razaoSocial) || invalidEmail(email) || isUndefined(telefone)) {
            res.status(400).json({ error: 'Dados inválidos' });
            return
        }

        const clinic = new Clinic.Clinic(cnpj.trim(), razaoSocial.trim(), email.trim(), telefone.trim());

        await clinic.save();

        res.status(201).json({ 
            message: 'Clínica criada com sucesso',
            clinica: {
                id: clinic.id,
                cnpj: clinic.cnpj,
                razaoSocial: clinic.razaoSocial,
                email: clinic.email,
                telefone: clinic.telefone
            }
        });
    } catch (err) {
        console.error('Erro ao criar clínica:', err);
        res.status(500).json({ error: 'Erro ao criar clínica', details: err.message });
    }
};

module.exports = {
    createClinic,
};
