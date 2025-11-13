const db = require('../config/database');

class ConsumedSupplement {
    id;
    formulario_id;
    descricao;
    quantidade;
    frequencia;

    constructor(formulario_id, descricao, quantidade, frequencia) {
        this.formulario_id = formulario_id;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.frequencia = frequencia;
    }

    async save() {
        await db.query(
            `INSERT INTO suplementos_consumidos(formulario_id, descricao, quantidade, frequencia)
             VALUES ($1, $2, $3, $4)`,
            [this.formulario_id, this.descricao, this.quantidade, this.frequencia]
        );
    }
}

module.exports = { ConsumedSupplement };
