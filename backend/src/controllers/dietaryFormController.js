const db = require('../config/database');
const { isUndefined } = require('../utils/validateInput');

const createDietaryForm = async (req, res) => {
  try {
    const { paciente_id, usuario_id, peso_atual, condicoes_clinicas, observacoes_vet } = req.body;
    if (isUndefined(paciente_id) || isUndefined(peso_atual)) {
      return res.status(400).json({ error: 'paciente_id e peso_atual são obrigatórios' });
    }
    
    // Verificar se o paciente pertence à clínica do usuário
    const { rows: pacienteRows } = await db.query('SELECT id FROM pacientes WHERE id = $1 AND clinica_id = $2', [Number(paciente_id), req.user.clinicaId]);
    if (!pacienteRows.length) return res.status(403).json({ error: 'Acesso negado: paciente não pertence à sua clínica' });

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
    let sql = `
      SELECT f.* 
      FROM formularios_dieteticos f
      JOIN pacientes p ON f.paciente_id = p.id
      WHERE p.clinica_id = $1
    `;
    const params = [req.user.clinicaId];
    if (paciente_id) {
      params.push(Number(paciente_id));
      sql += ` AND f.paciente_id = $${params.length}`;
    }
    sql += ' ORDER BY f.id DESC';
    const { rows } = await db.query(sql, params);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar formulários', details: err.message });
  }
};

const getDietaryFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query(`
      SELECT f.* 
      FROM formularios_dieteticos f
      JOIN pacientes p ON f.paciente_id = p.id
      WHERE f.id=$1 AND p.clinica_id = $2
    `, [Number(id), req.user.clinicaId]);
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
       WHERE id=$4 AND paciente_id IN (SELECT id FROM pacientes WHERE clinica_id = $5) RETURNING *`,
      [peso_atual ?? null, condicoes_clinicas ?? null, observacoes_vet ?? null, Number(id), req.user.clinicaId]
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
    const result = await db.query(`
      DELETE FROM formularios_dieteticos 
      WHERE id=$1 AND paciente_id IN (SELECT id FROM pacientes WHERE clinica_id = $2)
    `, [Number(id), req.user.clinicaId]);
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
