const db = require('../config/database');
const { isUndefined } = require('../utils/validateInput');

const createConsumedSupplement = async (req, res) => {
  try {
    const { formulario_id, descricao, quantidade, frequencia } = req.body;
    if (isUndefined(formulario_id) || isUndefined(descricao)) {
      return res.status(400).json({ error: 'formulario_id e descricao são obrigatórios' });
    }
    const { rows } = await db.query(
      `INSERT INTO suplementos_consumidos(formulario_id, descricao, quantidade, frequencia)
       VALUES($1,$2,$3,$4) RETURNING *`,
      [Number(formulario_id), descricao?.trim(), quantidade?.trim() || null, frequencia?.trim() || null]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao adicionar suplemento', details: err.message });
  }
};

const listConsumedSupplements = async (req, res) => {
  try {
    const { formulario_id } = req.query;
    let sql = 'SELECT * FROM suplementos_consumidos';
    const params = [];
    if (formulario_id) {
      params.push(Number(formulario_id));
      sql += ` WHERE formulario_id = $${params.length}`;
    }
    sql += ' ORDER BY id DESC';
    const { rows } = await db.query(sql, params);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar suplementos', details: err.message });
  }
};

const getConsumedSupplementById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM suplementos_consumidos WHERE id=$1', [Number(id)]);
    if (!rows.length) return res.status(404).json();
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar suplemento', details: err.message });
  }
};

const updateConsumedSupplement = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, quantidade, frequencia } = req.body;
    const { rows } = await db.query(
      `UPDATE suplementos_consumidos SET
        descricao = COALESCE($1, descricao),
        quantidade = COALESCE($2, quantidade),
        frequencia = COALESCE($3, frequencia)
       WHERE id=$4 RETURNING *`,
      [descricao?.trim() ?? null, quantidade?.trim() ?? null, frequencia?.trim() ?? null, Number(id)]
    );
    if (!rows.length) return res.status(404).json();
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar suplemento', details: err.message });
  }
};

const deleteConsumedSupplement = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM suplementos_consumidos WHERE id=$1', [Number(id)]);
    if (result.rowCount === 0) return res.status(404).json();
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar suplemento', details: err.message });
  }
};

module.exports = {
  createConsumedSupplement,
  listConsumedSupplements,
  getConsumedSupplementById,
  updateConsumedSupplement,
  deleteConsumedSupplement,
};
