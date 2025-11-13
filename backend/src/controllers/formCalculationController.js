const db = require('../config/database');
const { computeFormCalculation } = require('../services/calculationService');

// Create (upsert by formulario_id)
const upsertFormCalculation = async (req, res) => {
  try {
    const { formulario_id } = req.body;
    let { em_total_kcal_dia, nem_calculada_kcal_dia, quantidade_racao_recomendada_g_dia, auto } = req.body;
    if (!formulario_id) return res.status(400).json({ error: 'formulario_id é obrigatório' });

    // Se 'auto' for true, ou se não vierem valores, calcula automaticamente
    if (auto === true || (em_total_kcal_dia === undefined && nem_calculada_kcal_dia === undefined && quantidade_racao_recomendada_g_dia === undefined)) {
      const calculated = await computeFormCalculation(Number(formulario_id));
      em_total_kcal_dia = calculated.em_total_kcal_dia;
      nem_calculada_kcal_dia = calculated.nem_calculada_kcal_dia;
      quantidade_racao_recomendada_g_dia = calculated.quantidade_racao_recomendada_g_dia;
    }

    // Upsert
    try {
      const insert = await db.query(
        `INSERT INTO calculos_formulario(formulario_id, em_total_kcal_dia, nem_calculada_kcal_dia, quantidade_racao_recomendada_g_dia)
         VALUES ($1,$2,$3,$4) RETURNING *`,
        [Number(formulario_id), em_total_kcal_dia ?? null, nem_calculada_kcal_dia ?? null, quantidade_racao_recomendada_g_dia ?? null]
      );
      return res.status(201).json(insert.rows[0]);
    } catch (e) {
      if (e && e.code === '23505') {
        const update = await db.query(
          `UPDATE calculos_formulario SET 
            em_total_kcal_dia = COALESCE($2, em_total_kcal_dia),
            nem_calculada_kcal_dia = COALESCE($3, nem_calculada_kcal_dia),
            quantidade_racao_recomendada_g_dia = COALESCE($4, quantidade_racao_recomendada_g_dia)
           WHERE formulario_id = $1 RETURNING *`,
          [Number(formulario_id), em_total_kcal_dia ?? null, nem_calculada_kcal_dia ?? null, quantidade_racao_recomendada_g_dia ?? null]
        );
        return res.status(200).json(update.rows[0]);
      }
      throw e;
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao salvar cálculo', details: err.message });
  }
};

const listFormCalculations = async (req, res) => {
  try {
    const { formulario_id } = req.query;
    let sql = 'SELECT * FROM calculos_formulario';
    const params = [];
    if (formulario_id) {
      params.push(Number(formulario_id));
      sql += ` WHERE formulario_id = $${params.length}`;
    }
    const { rows } = await db.query(sql, params);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar cálculos', details: err.message });
  }
};

const getFormCalculationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM calculos_formulario WHERE id=$1', [Number(id)]);
    if (!rows.length) return res.status(404).json();
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar cálculo', details: err.message });
  }
};

const deleteFormCalculation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM calculos_formulario WHERE id=$1', [Number(id)]);
    if (result.rowCount === 0) return res.status(404).json();
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar cálculo', details: err.message });
  }
};

// Calcula e retorna sem persistir (útil para pré-visualização)
const computeOnly = async (req, res) => {
  try {
    const { formulario_id } = req.query;
    if (!formulario_id) return res.status(400).json({ error: 'formulario_id é obrigatório' });
    const result = await computeFormCalculation(Number(formulario_id));
    return res.status(200).json({ formulario_id: Number(formulario_id), ...result });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao calcular', details: err.message });
  }
};

module.exports = {
  upsertFormCalculation,
  listFormCalculations,
  getFormCalculationById,
  deleteFormCalculation,
  computeOnly,
};
