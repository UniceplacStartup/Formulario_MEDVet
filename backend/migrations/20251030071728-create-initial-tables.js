'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // --- Criar Tabelas ---

    // Tabela para RF01: Cadastro da Clínica
    await queryInterface.createTable('clinicas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      razao_social: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cnpj: {
        type: Sequelize.STRING(18),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      telefone: {
        type: Sequelize.STRING(20)
      },
      // Timestamps automáticos
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tabela para RF02 e RF03: Login e Gerenciamento de Usuários
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      clinica_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { // Chave estrangeira
          model: 'clinicas', // Nome da tabela referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Se a clínica for apagada, os usuários também são
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      password_hash: { // RNF02: Criptografia de senha (bcrypt)
        type: Sequelize.STRING(255),
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('admin', 'veterinario', 'atendente'),
        allowNull: false,
        defaultValue: 'veterinario'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    // Adiciona a constraint UNIQUE composta (email por clínica)
    await queryInterface.addConstraint('usuarios', {
      fields: ['clinica_id', 'email'],
      type: 'unique',
      name: 'usuarios_clinica_id_email_uk'
    });

    // Tabela para dados do Tutor (Dono do animal)
    await queryInterface.createTable('tutores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      clinica_id: { // Para isolamento de dados
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'clinicas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      contato: { // Pode ser email ou telefone
        type: Sequelize.STRING(255)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tabela para dados do Paciente (Animal)
    await queryInterface.createTable('pacientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      tutor_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'tutores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' // Não deixa apagar tutor se tiver paciente
      },
      clinica_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'clinicas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      especie: {
        type: Sequelize.ENUM('cao', 'gato'), // Usando ENUM
        allowNull: false
      },
      raca: {
        type: Sequelize.STRING(100)
      },
      data_nascimento: {
        type: Sequelize.DATEONLY // Apenas data, sem hora
      },
      peso_ideal: { // Para o comparativo
        type: Sequelize.DECIMAL(5, 2) // Ex: 10.50 kg
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tabela para RF04, RF05, RF08: Formulário de Histórico Dietético
    await queryInterface.createTable('formularios_dieteticos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      paciente_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'pacientes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Apaga o histórico se o paciente for apagado
      },
      usuario_id: { // O veterinário que preencheu
        type: Sequelize.BIGINT,
        allowNull: true, // Manter o histórico mesmo se o usuário for deletado
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      peso_atual: { // Peso no dia da consulta
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      condicoes_clinicas: { // Condições clínicas
        type: Sequelize.TEXT
      },
      observacoes_vet: { // Observações do veterinário
        type: Sequelize.TEXT
      },
      created_at: { // RF05: Registro de data/hora
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Tabela de alimentos (ligada ao formulário)
    await queryInterface.createTable('alimentos_consumidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      formulario_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'formularios_dieteticos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      descricao_alimento: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      tipo: { // ex: 'seco', 'umido'
        type: Sequelize.STRING(50)
      },
      quantidade_g_dia: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      frequencia: { // ex: '2x ao dia'
        type: Sequelize.STRING(100)
      },
      // Dados para cálculo da EM (Energia Metabolizável)
      proteina_bruta_p: { type: Sequelize.DECIMAL(5, 2) }, // %
      extrato_etereo_p: { type: Sequelize.DECIMAL(5, 2) }, // %
      extrativo_nao_nitrogenado_p: { type: Sequelize.DECIMAL(5, 2) }, // %
      umidade_p: { type: Sequelize.DECIMAL(5, 2) },
      fibra_bruta_p: { type: Sequelize.DECIMAL(5, 2) },
      materia_mineral_p: { type: Sequelize.DECIMAL(5, 2) }
    });

    // Tabela de suplementos (ligada ao formulário)
    await queryInterface.createTable('suplementos_consumidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      formulario_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'formularios_dieteticos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      descricao: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      quantidade: {
        type: Sequelize.STRING(100)
      },
      frequencia: {
        type: Sequelize.STRING(100)
      }
    });

    // Tabela para RF06: Armazenamento dos Cálculos Automáticos
    await queryInterface.createTable('calculos_formulario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      formulario_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true, // Relação 1 para 1
        references: {
          model: 'formularios_dieteticos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      em_total_kcal_dia: { // Energia Metabolizável total da dieta
        type: Sequelize.DECIMAL(10, 2)
      },
      nem_calculada_kcal_dia: { // Necessidade Energética de Manutenção
        type: Sequelize.DECIMAL(10, 2)
      },
      quantidade_racao_recomendada_g_dia: { // Resultado do cálculo
        type: Sequelize.DECIMAL(10, 2)
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // --- Apagar Tabelas (em ordem reversa das chaves estrangeiras) ---
    await queryInterface.dropTable('calculos_formulario');
    await queryInterface.dropTable('suplementos_consumidos');
    await queryInterface.dropTable('alimentos_consumidos');
    await queryInterface.dropTable('formularios_dieteticos');
    await queryInterface.dropTable('pacientes');
    await queryInterface.dropTable('tutores');
    await queryInterface.dropTable('usuarios');
    await queryInterface.dropTable('clinicas');
    // --- Apagar ENUMs criados pelo Sequelize (se existirem) ---
    // Nome padrão do enum no Postgres: enum_<tabela>_<coluna>
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_usuarios_role";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_pacientes_especie";');
  }
};