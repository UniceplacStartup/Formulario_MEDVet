const db = require('../config/database');
const { isUndefined } = require('../utils/validateInput');

// Create
const createPatient = async (req, res) => {
  try {
    const clinica_id = req.user.clinicaId;
    const { tutor_id, nome, especie, raca, data_nascimento, peso_ideal } = req.body;

    if (isUndefined(tutor_id) || isUndefined(nome) || isUndefined(especie)) {
      return res.status(400).json({ error: 'tutor_id, nome e especie são obrigatórios' });
    }

    const { rows } = await db.query(
      `INSERT INTO pacientes (tutor_id, clinica_id, nome, especie, raca, data_nascimento, peso_ideal)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [Number(tutor_id), Number(clinica_id), nome?.trim(), especie?.trim(), raca?.trim() || null, data_nascimento || null, peso_ideal || null]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao criar paciente', details: err.message });
  }
};

// Read all (optional filter by tutor_id)
const listPatients = async (req, res) => {
  try {
    const clinica_id = req.user.clinicaId;
    const { tutor_id } = req.query;
    let sql = 'SELECT * FROM pacientes WHERE clinica_id = $1';
    const params = [Number(clinica_id)];
    
    if (tutor_id) {
      params.push(Number(tutor_id));
      sql += ` AND tutor_id = $2`;
    }
    sql += ' ORDER BY id DESC';
    const { rows } = await db.query(sql, params);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao listar pacientes', details: err.message });
  }
};

// Read one
const getPatientById = async (req, res) => {
  try {
    return res.status(200).json(req.paciente);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar paciente', details: err.message });
  }
};

// Update (partial)
const updatePatient = async (req, res) => {
  try {
    const { id } = req.paciente;
    const { nome, especie, raca, data_nascimento, peso_ideal } = req.body;
    const { rows } = await db.query(
      `UPDATE pacientes SET 
        nome = COALESCE($1, nome),
        especie = COALESCE($2, especie),
        raca = COALESCE($3, raca),
        data_nascimento = COALESCE($4, data_nascimento),
        peso_ideal = COALESCE($5, peso_ideal),
        updated_at = NOW()
       WHERE id = $6 RETURNING *`,
      [nome?.trim() ?? null, especie?.trim() ?? null, raca?.trim() ?? null, data_nascimento ?? null, peso_ideal ?? null, Number(id)]
    );
    if (!rows.length) return res.status(404).json();
    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar paciente', details: err.message });
  }
};

// Delete
const deletePatient = async (req, res) => {
  try {
    const { id } = req.paciente;
    const result = await db.query('DELETE FROM pacientes WHERE id = $1', [Number(id)]);
    if (result.rowCount === 0) return res.status(404).json();
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover paciente', details: err.message });
  }
};

module.exports = {
  createPatient,
  listPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
