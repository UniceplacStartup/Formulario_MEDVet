const db = require('../config/database');
const { isUndefined } = require('../utils/validateInput');

const createConsumedFood = async (req, res) => {
  try {
    const { formulario_id, descricao_alimento, tipo, quantidade_g_dia, frequencia, proteina_bruta_p, extrato_etereo_p, extrativo_nao_nitrogenado_p, umidade_p, fibra_bruta_p, materia_mineral_p } = req.body;
    if (isUndefined(formulario_id) || isUndefined(descricao_alimento) || isUndefined(quantidade_g_dia)) {
      return res.status(400).json({ error: 'formulario_id, descricao_alimento e quantidade_g_dia são obrigatórios' });
    }
    const { rows } = await db.query(
      `INSERT INTO alimentos_consumidos(
        formulario_id, descricao_alimento, tipo, quantidade_g_dia, frequencia,
        proteina_bruta_p, extrato_etereo_p, extrativo_nao_nitrogenado_p, umidade_p, fibra_bruta_p, materia_mineral_p)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [Number(formulario_id), descricao_alimento?.trim(), tipo?.trim() || null, quantidade_g_dia, frequencia?.trim() || null,
        proteina_bruta_p ?? null, extrato_etereo_p ?? null, extrativo_nao_nitrogenado_p ?? null, umidade_p ?? null, fibra_bruta_p ?? null, materia_mineral_p ?? null]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao adicionar alimento', details: err.message });
  }
};

const listConsumedFoods = async (req, res) => {
  try {
    const { formulario_id } = req.query;
    let sql = 'SELECT * FROM alimentos_consumidos';
    const params = [];
    if (formulario_id) {
      params.push(Number(formulario_id));
      sql += ` WHERE formulario_id = $${params.length}`;
    }
    sql += ' ORDER BY id DESC';
    const { rows } = await db.query(sql, params);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar alimentos', details: err.message });
  }
};

const getConsumedFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM alimentos_consumidos WHERE id=$1', [Number(id)]);
    if (!rows.length) return res.status(404).json();
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar alimento', details: err.message });
  }
};

const updateConsumedFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao_alimento, tipo, quantidade_g_dia, frequencia, proteina_bruta_p, extrato_etereo_p, extrativo_nao_nitrogenado_p, umidade_p, fibra_bruta_p, materia_mineral_p } = req.body;
    const { rows } = await db.query(
      `UPDATE alimentos_consumidos SET
        descricao_alimento = COALESCE($1, descricao_alimento),
        tipo = COALESCE($2, tipo),
        quantidade_g_dia = COALESCE($3, quantidade_g_dia),
        frequencia = COALESCE($4, frequencia),
        proteina_bruta_p = COALESCE($5, proteina_bruta_p),
        extrato_etereo_p = COALESCE($6, extrato_etereo_p),
        extrativo_nao_nitrogenado_p = COALESCE($7, extrativo_nao_nitrogenado_p),
        umidade_p = COALESCE($8, umidade_p),
        fibra_bruta_p = COALESCE($9, fibra_bruta_p),
        materia_mineral_p = COALESCE($10, materia_mineral_p)
       WHERE id=$11 RETURNING *`,
      [descricao_alimento?.trim() ?? null, tipo?.trim() ?? null, quantidade_g_dia ?? null, frequencia?.trim() ?? null,
        proteina_bruta_p ?? null, extrato_etereo_p ?? null, extrativo_nao_nitrogenado_p ?? null, umidade_p ?? null, fibra_bruta_p ?? null, materia_mineral_p ?? null,
        Number(id)]
    );
    if (!rows.length) return res.status(404).json();
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar alimento', details: err.message });
  }
};

const deleteConsumedFood = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM alimentos_consumidos WHERE id=$1', [Number(id)]);
    if (result.rowCount === 0) return res.status(404).json();
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar alimento', details: err.message });
  }
};

module.exports = {
  createConsumedFood,
  listConsumedFoods,
  getConsumedFoodById,
  updateConsumedFood,
  deleteConsumedFood,
};
