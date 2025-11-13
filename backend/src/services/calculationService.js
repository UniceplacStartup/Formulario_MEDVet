const db = require('../config/database');

// Helpers
const round2 = (n) => (n === null || n === undefined || isNaN(n) ? null : Math.round(n * 100) / 100);

// Atwater modificado (kcal/g)
const FACTOR_PROTEIN = 3.5;
const FACTOR_FAT = 8.5;
const FACTOR_NFE = 3.5;

async function getFormById(formulario_id) {
  const { rows } = await db.query('SELECT id, paciente_id, peso_atual FROM formularios_dieteticos WHERE id=$1', [Number(formulario_id)]);
  return rows[0];
}

async function getPatientById(paciente_id) {
  const { rows } = await db.query('SELECT id, especie FROM pacientes WHERE id=$1', [Number(paciente_id)]);
  return rows[0];
}

async function getFoodsByFormId(formulario_id) {
  const { rows } = await db.query(
    `SELECT id, quantidade_g_dia,
            proteina_bruta_p, extrato_etereo_p, extrativo_nao_nitrogenado_p
       FROM alimentos_consumidos
      WHERE formulario_id=$1`,
    [Number(formulario_id)]
  );
  return rows;
}

function computeEMFromFoods(foods) {
  let totalKcal = 0;
  let totalGrams = 0;
  for (const f of foods) {
    const qty = Number(f.quantidade_g_dia) || 0;
    const prot_g = qty * ((Number(f.proteina_bruta_p) || 0) / 100);
    const fat_g = qty * ((Number(f.extrato_etereo_p) || 0) / 100);
    const nfe_g = qty * ((Number(f.extrativo_nao_nitrogenado_p) || 0) / 100);
    const kcal = FACTOR_PROTEIN * prot_g + FACTOR_FAT * fat_g + FACTOR_NFE * nfe_g;
    totalKcal += kcal;
    totalGrams += qty;
  }
  return { totalKcal: round2(totalKcal), totalGrams: round2(totalGrams) };
}

function computeRERKg(weightKg) {
  if (!weightKg || weightKg <= 0) return null;
  return 70 * Math.pow(Number(weightKg), 0.75);
}

function defaultMaintenanceFactor(specie) {
  // Fatores simplificados para demo
  if (specie === 'cao') return 1.6; // cão adulto castrado
  if (specie === 'gato') return 1.2; // gato adulto castrado
  return 1.4; // fallback
}

async function computeFormCalculation(formulario_id) {
  const form = await getFormById(formulario_id);
  if (!form) throw new Error('Formulário não encontrado');

  const patient = await getPatientById(form.paciente_id);
  if (!patient) throw new Error('Paciente não encontrado para o formulário');

  const foods = await getFoodsByFormId(formulario_id);

  const { totalKcal: em_total_kcal_dia, totalGrams } = computeEMFromFoods(foods);
  const rer = computeRERKg(Number(form.peso_atual));
  let nem_calculada_kcal_dia = null;
  if (rer !== null) {
    nem_calculada_kcal_dia = rer * defaultMaintenanceFactor(patient.especie);
  }

  let quantidade_racao_recomendada_g_dia = null;
  if (nem_calculada_kcal_dia !== null && totalGrams && totalGrams > 0 && em_total_kcal_dia && em_total_kcal_dia > 0) {
    const densidade = em_total_kcal_dia / totalGrams; // kcal por grama da dieta atual
    quantidade_racao_recomendada_g_dia = nem_calculada_kcal_dia / densidade;
  }

  return {
    em_total_kcal_dia: round2(em_total_kcal_dia),
    nem_calculada_kcal_dia: round2(nem_calculada_kcal_dia),
    quantidade_racao_recomendada_g_dia: round2(quantidade_racao_recomendada_g_dia),
  };
}

module.exports = {
  computeFormCalculation,
};
