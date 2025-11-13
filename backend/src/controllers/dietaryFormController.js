const db = require('../config/database');
const { isUndefined } = require('../utils/validateInput');

const createDietaryForm = async (req, res) => {
  try {
    const { paciente_id, usuario_id, peso_atual, condicoes_clinicas, observacoes_vet } = req.body;
    if (isUndefined(paciente_id) || isUndefined(peso_atual)) {
      return res.status(400).json({ error: 'paciente_id e peso_atual são obrigatórios' });
    }
    const { rows } = await db.query(
      `INSERT INTO formularios_dieteticos (paciente_id, usuario_id, peso_atual, condicoes_clinicas, observacoes_vet)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [Number(paciente_id), usuario_id ? Number(usuario_id) : null, peso_atual, condicoes_clinicas || null, observacoes_vet || null]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao criar formulário', details: err.message });
  }
};

const listDietaryForms = async (req, res) => {
  try {
    const { paciente_id } = req.query;
    let sql = 'SELECT * FROM formularios_dieteticos';
    const params = [];
    if (paciente_id) {
      params.push(Number(paciente_id));
      sql += ` WHERE paciente_id = $${params.length}`;
    }
    sql += ' ORDER BY id DESC';
    const { rows } = await db.query(sql, params);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar formulários', details: err.message });
  }
};

const getDietaryFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM formularios_dieteticos WHERE id=$1', [Number(id)]);
    if (!rows.length) return res.status(404).json();
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar formulário', details: err.message });
  }
};

const updateDietaryForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { peso_atual, condicoes_clinicas, observacoes_vet } = req.body;
    const { rows } = await db.query(
      `UPDATE formularios_dieteticos SET 
        peso_atual = COALESCE($1, peso_atual),
        condicoes_clinicas = COALESCE($2, condicoes_clinicas),
        observacoes_vet = COALESCE($3, observacoes_vet),
        updated_at = NOW()
       WHERE id=$4 RETURNING *`,
      [peso_atual ?? null, condicoes_clinicas ?? null, observacoes_vet ?? null, Number(id)]
    );
    if (!rows.length) return res.status(404).json();
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar formulário', details: err.message });
  }
};

const deleteDietaryForm = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM formularios_dieteticos WHERE id=$1', [Number(id)]);
    if (result.rowCount === 0) return res.status(404).json();
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar formulário', details: err.message });
  }
};

module.exports = {
  createDietaryForm,
  listDietaryForms,
  getDietaryFormById,
  updateDietaryForm,
  deleteDietaryForm,
};
