const db = require('../config/database');

class ConsumedFood {
    id;
    formulario_id;
    descricao_alimento;
    tipo;
    quantidade_g_dia;
    frequencia;
    proteina_bruta_p;
    extrato_etereo_p;
    extrativo_nao_nitrogenado_p;
    umidade_p;
    fibra_bruta_p;
    materia_mineral_p;

    constructor(formulario_id, descricao_alimento, tipo, quantidade_g_dia, frequencia, proteina_bruta_p, extrato_etereo_p, extrativo_nao_nitrogenado_p, umidade_p, fibra_bruta_p, materia_mineral_p) {
        this.formulario_id = formulario_id;
        this.descricao_alimento = descricao_alimento;
        this.tipo = tipo;
        this.quantidade_g_dia = quantidade_g_dia;
        this.frequencia = frequencia;
        this.proteina_bruta_p = proteina_bruta_p;
        this.extrato_etereo_p = extrato_etereo_p;
        this.extrativo_nao_nitrogenado_p = extrativo_nao_nitrogenado_p;
        this.umidade_p = umidade_p;
        this.fibra_bruta_p = fibra_bruta_p;
        this.materia_mineral_p = materia_mineral_p;
    }

    async save() {
        await db.query(`
            INSERT INTO alimentos_consumidos(
                formulario_id, 
                descricao_alimento, 
                tipo, 
                quantidade_g_dia, 
                frequencia, 
                proteina_bruta_p, 
                extrato_etereo_p, 
                extrativo_nao_nitrogenado_p, 
                umidade_p, 
                fibra_bruta_p, 
                materia_mineral_p
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, 
            [
                this.formulario_id,
                this.descricao_alimento,
                this.tipo,
                this.quantidade_g_dia,
                this.frequencia,
                this.proteina_bruta_p,
                this.extrato_etereo_p,
                this.extrativo_nao_nitrogenado_p,
                this.umidade_p,
                this.fibra_bruta_p,
                this.materia_mineral_p
            ]);
    }
}

module.exports = { ConsumedFood };

