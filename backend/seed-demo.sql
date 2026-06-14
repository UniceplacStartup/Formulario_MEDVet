-- Script para criar dados de demonstração no MedVet
-- Execute este script no PostgreSQL após rodar as migrations

-- 1. Criar uma clínica de demonstração
INSERT INTO clinicas (cnpj, razao_social, nome_fantasia, telefone, email, crmv)
VALUES ('12345678000100', 'Clínica Veterinária Demo LTDA', 'VetDemo', '11999999999', 'contato@vetdemo.com', 'SP-99999')
ON CONFLICT (cnpj) DO NOTHING
RETURNING id;

-- 2. Criar um usuário demo (senha: demo123)
-- Hash bcrypt de 'demo123' com 10 rounds: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO usuarios (clinica_id, nome, email, password_hash, role)
VALUES (1, 'Admin Demo', 'admin@demo.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 3. Criar um tutor de exemplo
INSERT INTO tutores (clinica_id, nome, cpf, telefone, email, endereco)
VALUES (1, 'Maria Silva', '12345678901', '11987654321', 'maria@email.com', 'Rua das Flores, 123')
ON CONFLICT (cpf) DO NOTHING
RETURNING id;

-- 4. Criar um paciente de exemplo
INSERT INTO pacientes (tutor_id, nome, especie, raca, sexo, data_nascimento, peso, condicao_corporal)
VALUES (1, 'Rex', 'cao', 'Labrador', 'macho', '2020-01-15', 28.5, 'ideal')
RETURNING id;

-- Verificar dados inseridos
SELECT 'Clínicas:' as tabela, COUNT(*) as total FROM clinicas
UNION ALL
SELECT 'Usuários:', COUNT(*) FROM usuarios
UNION ALL
SELECT 'Tutores:', COUNT(*) FROM tutores
UNION ALL
SELECT 'Pacientes:', COUNT(*) FROM pacientes;
