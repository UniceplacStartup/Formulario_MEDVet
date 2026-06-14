// Script para criar dados de demonstração via API
const bcrypt = require('bcrypt');
const db = require('./src/config/database');

async function seedDemo() {
  try {
    console.log('🌱 Iniciando seed de dados demo...');

    // 1. Criar clínica
    const clinicaResult = await db.query(
      `INSERT INTO clinicas (cnpj, razao_social, telefone, email)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (cnpj) DO UPDATE SET razao_social = EXCLUDED.razao_social
       RETURNING id`,
      ['12345678000100', 'Clínica Demo LTDA', '11999999999', 'demo@vet.com']
    );
    const clinicaId = clinicaResult.rows[0].id;
    console.log(`✅ Clínica criada (ID: ${clinicaId})`);

    // 2. Criar usuário admin
    const passwordHash = await bcrypt.hash('Demo1234', 10);
    await db.query(
      `INSERT INTO usuarios (clinica_id, nome, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (clinica_id, email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      [clinicaId, 'Admin Demo', 'admin@demo.com', passwordHash, 'admin']
    );
    console.log('✅ Usuário criado (admin@demo.com / Demo1234)');

    // 3. Criar tutor exemplo
    const tutorResult = await db.query(
      `INSERT INTO tutores (clinica_id, nome, contato)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [clinicaId, 'Maria Silva', '11987654321 - maria@email.com']
    );
    const tutorId = tutorResult.rows[0].id;
    console.log(`✅ Tutor criado (ID: ${tutorId})`);

    // 4. Criar paciente exemplo
    const pacienteResult = await db.query(
      `INSERT INTO pacientes (tutor_id, clinica_id, nome, especie, raca, data_nascimento, peso_ideal)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [tutorId, clinicaId, 'Rex', 'cao', 'Labrador', '2020-01-15', 28.5]
    );
    const pacienteId = pacienteResult.rows[0].id;
    console.log(`✅ Paciente criado (ID: ${pacienteId})`);

    console.log('\n🎉 Dados de demonstração criados com sucesso!');
    console.log('\n📝 Use estas credenciais para login:');
    console.log('   Email: admin@demo.com');
    console.log('   Senha: Demo1234');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao criar dados:', error.message);
    process.exit(1);
  }
}

seedDemo();
