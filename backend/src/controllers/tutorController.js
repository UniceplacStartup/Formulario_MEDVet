const db = require('../config/database');
const { isUndefined } = require('../utils/validateInput');

// Create
const createTutor = async (req, res) => {
  try {
    const clinica_id = req.user.clinicaId;
    const { nome, contato } = req.body;

    if (isUndefined(nome)) {
      res.status(400).json({ error: 'nome é obrigatório' });
      return;
    }

    const { rows } = await db.query(
      'INSERT INTO tutores (clinica_id, nome, contato) VALUES ($1, $2, $3) RETURNING *',
      [clinica_id, nome.trim(), contato?.trim() || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar tutor', details: err.message });
  }
};

// Read All
const listTutores = async (req, res) => {
  try {
    const clinica_id = req.user.clinicaId;
    const { rows } = await db.query('SELECT * FROM tutores WHERE clinica_id = $1 ORDER BY id DESC', [clinica_id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar tutores', details: err.message });
  }
};

// Read One
const getTutorById = async (req, res) => {
  try {
    const { id } = req.params;
    const clinica_id = req.user.clinicaId;
    const { rows } = await db.query('SELECT * FROM tutores WHERE id = $1 AND clinica_id = $2', [id, clinica_id]);
    if (rows.length === 0) {
      res.status(404).json();
      return;
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tutor', details: err.message });
  }
};

// Update
const updateTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const clinica_id = req.user.clinicaId;
    const { nome, contato } = req.body;
    const { rows } = await db.query(
      'UPDATE tutores SET nome = COALESCE($1, nome), contato = COALESCE($2, contato), updated_at = NOW() WHERE id = $3 AND clinica_id = $4 RETURNING *',
      [nome?.trim() ?? null, contato?.trim() ?? null, id, clinica_id]
    );
    if (rows.length === 0) {
      res.status(404).json();
      return;
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar tutor', details: err.message });
  }
};

// Delete
const deleteTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const clinica_id = req.user.clinicaId;

    // Verificar se tutor tem pacientes vinculados
    const { rows: pacientes } = await db.query('SELECT COUNT(*) as count FROM pacientes WHERE tutor_id = $1', [id]);
    if (parseInt(pacientes[0].count) > 0) {
      res.status(409).json({ error: 'Não é possível deletar um tutor que tem pacientes vinculados. Remova os pacientes primeiro.' });
      return;
    }

    const result = await db.query('DELETE FROM tutores WHERE id = $1 AND clinica_id = $2', [id, clinica_id]);
    if (result.rowCount === 0) {
      res.status(404).json();
      return;
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar tutor', details: err.message });
  }
};

module.exports = {
  createTutor,
  listTutores,
  getTutorById,
  updateTutor,
  deleteTutor,
};
