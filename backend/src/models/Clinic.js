const db = require('../config/database');

class Clinic {
    id;
    cnpj;
    razaoSocial;
    email; 
    telefone; 
    created_at; 
    updated_at; 

    constructor(cnpj, razaoSocial, email, telefone) {
        this.cnpj = cnpj;
        this.razaoSocial = razaoSocial;
        this.email = email;
        this.telefone = telefone;
    }

    async save() {
        const result = await db.query(
            'INSERT INTO clinicas(razao_social, cnpj, email, telefone) VALUES($1, $2, $3, $4) RETURNING *',
            [this.razaoSocial, this.cnpj, this.email, this.telefone]
        );
        const row = result.rows[0];
        this.id = row.id;
        this.created_at = row.created_at;
        this.updated_at = row.updated_at;
        return this;
    }
}

module.exports = { Clinic };
