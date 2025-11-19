const db = require('../config/database');

class FormCalculation {
    id;
    formulario_id;
    em_total_kcal_dia;
    nem_calculada_kcal_dia;
    quantidade_racao_recomendada_g_dia;
    created_at;
    updated_at;

    constructor(formulario_id, em_total_kcal_dia, nem_calculada_kcal_dia, quantidade_racao_recomendada_g_dia) {
        this.formulario_id = formulario_id;
        this.em_total_kcal_dia = em_total_kcal_dia;
        this.nem_calculada_kcal_dia = nem_calculada_kcal_dia;
        this.quantidade_racao_recomendada_g_dia = quantidade_racao_recomendada_g_dia;
    }

    async save() {
        await db.query(` INSERT INTO calculos_formulario( formulario_id, em_total_kcal_dia, nem_calculada_kcal_dia, quantidade_racao_recomendada_g_dia) VALUES ($1, $2, $3, $4)`,
            [
                this.formulario_id,
                this.em_total_kcal_dia,
                this.nem_calculada_kcal_dia,
                this.quantidade_racao_recomendada_g_dia
            ]);
    }
}

module.exports = { FormCalculation };

