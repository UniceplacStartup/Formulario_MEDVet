const Tutor = require('../models/Tutor');

const { isUndefined } = require('../utils/validateInput');

const createTutor = async (req, res) => {
    const { clinica_id, nome, contato } = req.body;


    if (isUndefined(clinica_id) || isUndefined(nome) || isUndefined(contato)) {
        res.status(400).json();
        return
    }


    const tutor = new Tutor.Tutor(clinica_id.trim(), nome.trim(), contato.trim());

    try {
        await tutor.save();
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao salvar o tutor." });
    }
};

module.exports = {
    createTutor,
};