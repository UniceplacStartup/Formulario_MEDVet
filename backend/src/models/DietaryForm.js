const db = require('../config/database');

class DietaryForm {
    id;
    paciente_id;
    usuario_id;
    peso_atual;
    condicoes_clinicas;
    observacoes_vet;
    created_at; 
    updated_at;
    
    constructor(paciente_id, usuario_id, peso_atual, condicoes_clinicas, observacoes_vet) {
        this.paciente_id = paciente_id;
        this.usuario_id = usuario_id;
        this.peso_atual = peso_atual;
        this.condicoes_clinicas = condicoes_clinicas;
        this.observacoes_vet = observacoes_vet;
    }

    async save() {
        await db.query('INSERT INTO formularios_dieteticos(paciente_id, usuario_id, peso_atual, condicoes_clinicas, observacoes_vet) VALUES($1, $2, $3, $4, $5)', [
            this.paciente_id,
            this.usuario_id,
            this.peso_atual,
            this.condicoes_clinicas, 
            this.observacoes_vet, 
        ]); 
    }
}

module.exports = { DietaryForm }
