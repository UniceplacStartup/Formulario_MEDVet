const db = require('../config/database');

class Patient {
    id;
    tutor_id; 
    clinica_id;
    nome;
    especie; //ENUM: 'cao', 'gato'
    raca;
    data_nascimento;
    peso_ideal;
    created_at;
    updated_at;

    constructor(tutor_id, clinica_id, nome, especie,  raca, data_nascimento, peso_ideal) {
        this.tutor_id = tutor_id;
        this.clinica_id = clinica_id;
        this.nome = nome;
        this.especie = especie;
        this.raca = raca;
        this.data_nascimento = data_nascimento;
        this.peso_ideal = peso_ideal;
    }


    //TODO avaliar a necessidade de usar o clinica_id  e corrigir o erro ao cadastrar um novo paciente.
    async save() {
        await db.query('INSERT INTO pacientes(tutor_id, clinica_id, nome, especie,  raca, data_nascimento, peso_ideal) VALUES($1, $2, $3, $4, $5, $6, $7)', [
            this.tutor_id,
            this.clinica_id,
            this.nome,
            this.especie,
            this.raca,
            this.data_nascimento,
            this.peso_ideal,
        ]); 
    }
}

module.exports = { Patient };
