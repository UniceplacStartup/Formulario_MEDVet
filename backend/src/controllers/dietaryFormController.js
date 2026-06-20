const db = require('../config/database');
const { isUndefined } = require('../utils/validateInput');
const NutritionalCalculator = require('../services/NutritionalCalculator');

const createDietaryForm = async (req, res) => {
  try {
    const { paciente_id, usuario_id, peso_atual, condicoes_clinicas, observacoes_vet } = req.body;
    if (isUndefined(paciente_id) || isUndefined(peso_atual)) {
      return res.status(400).json({ error: 'paciente_id e peso_atual são obrigatórios' });
    }
    
    // Verificar se o paciente pertence à clínica do usuário e buscar dados completos
    const { rows: pacienteRows } = await db.query('SELECT * FROM pacientes WHERE id = $1 AND clinica_id = $2', [Number(paciente_id), req.user.clinicaId]);
    if (!pacienteRows.length) return res.status(403).json({ error: 'Acesso negado: paciente não pertence à sua clínica' });

    const paciente = pacienteRows[0];

    const { rows } = await db.query(
      `INSERT INTO formularios_dieteticos (paciente_id, usuario_id, peso_atual, condicoes_clinicas, observacoes_vet)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [Number(paciente_id), usuario_id ? Number(usuario_id) : null, peso_atual, condicoes_clinicas || null, observacoes_vet || null]
    );
    
    const formulario = rows[0];

    try {
      // Dispara o cálculo nutricional passando array vazio de alimentos (novo formulário)
      const calculo = NutritionalCalculator.calcular(paciente, formulario, []);
      
      // Persiste os resultados na tabela de cálculos com conversão explícita de ID
      await db.query(`
        INSERT INTO calculos_formulario (formulario_id, em_total_kcal_dia, nem_calculada_kcal_dia, quantidade_racao_recomendada_g_dia)
        VALUES ($1, $2, $3, $4)
      `, [Number(formulario.id), calculo.emTotal, calculo.nem, calculo.quantidadeRecomendada]);
    } catch (errCalc) {
      // Falhas no cálculo não quebram o fluxo principal
      console.error('Erro no cálculo nutricional (create):', errCalc.message);
    }

    return res.status(201).json(formulario);
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
    return res.status(200).json(req.formulario);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar formulário', details: err.message });
  }
};

const updateDietaryForm = async (req, res) => {
  try {
    const { id } = req.formulario;
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
    
    const formularioAtualizado = rows[0];

    try {
      // Busca dados completos do paciente
      const { rows: pacRows } = await db.query('SELECT * FROM pacientes WHERE id = $1', [Number(formularioAtualizado.paciente_id)]);
      const paciente = pacRows[0];

      // Busca os alimentos associados ao formulário
      const { rows: alimentos } = await db.query('SELECT * FROM alimentos_consumidos WHERE formulario_id = $1', [Number(id)]);

      // Dispara o cálculo nutricional com os dados atualizados
      const calculo = NutritionalCalculator.calcular(paciente, formularioAtualizado, alimentos);

      // Upsert: atualiza se já existir ou insere um novo garantindo a relação 1:1
      await db.query(`
        INSERT INTO calculos_formulario (formulario_id, em_total_kcal_dia, nem_calculada_kcal_dia, quantidade_racao_recomendada_g_dia)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (formulario_id) DO UPDATE SET
          em_total_kcal_dia = EXCLUDED.em_total_kcal_dia,
          nem_calculada_kcal_dia = EXCLUDED.nem_calculada_kcal_dia,
          quantidade_racao_recomendada_g_dia = EXCLUDED.quantidade_racao_recomendada_g_dia
      `, [Number(id), calculo.emTotal, calculo.nem, calculo.quantidadeRecomendada]);
    } catch (errCalc) {
      // Falhas no cálculo não quebram o fluxo principal
      console.error('Erro no cálculo nutricional (update):', errCalc.message);
    }

    return res.status(200).json(formularioAtualizado);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar formulário', details: err.message });
  }
};

const deleteDietaryForm = async (req, res) => {
  try {
    const { id } = req.formulario;
    const result = await db.query(`
      DELETE FROM formularios_dieteticos 
      WHERE id=$1
    `, [Number(id)]);
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
