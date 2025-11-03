const db = require('../config/database');

class Clinic {
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
        await db.query('INSERT INTO clinicas(razao_social, cnpj, email, telefone) VALUES($1, $2, $3, $4)', [this.razaoSocial, this.cnpj, this.email, this.telefone]); 
    }
}

module.exports = { Clinic };
