const db = require('../config/database');

class Tutor {
    id;
    clinica_id;
    nome;
    contato;
    created_at; 
    updated_at; 

    constructor(clinica_id, nome, contato) {
        this.clinica_id = clinica_id;
        this.nome = nome;
        this.contato = contato;
    }

    async save() {
        
        await db.query('INSERT INTO tutores(clinica_id, nome, contato) VALUES($1, $2, $3)', [this.clinica_id, this.nome, this.contato]); 
    }

    
}

module.exports = { Tutor };