<template>
  <div class="page">
    <header class="page-header">
      <h1>👥 Tutores</h1>
      <RouterLink to="/dashboard" class="btn-back">← Voltar</RouterLink>
    </header>

    <div class="page-content">
      <!-- Formulário -->
      <div class="form-card">
        <h2>{{ editingId ? 'Editar' : 'Novo' }} Tutor</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group">
              <label>Nome *</label>
              <input v-model="form.nome" type="text" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Telefone</label>
              <input v-model="form.telefone" type="text" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" />
            </div>
          </div>

          

          <div class="form-actions">
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? 'Salvando...' : 'Salvar' }}
            </button>
            <button v-if="editingId" type="button" class="btn-secondary" @click="cancelEdit">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Lista -->
      <div class="list-card">
        <h2>Lista de Tutores</h2>
        <div v-if="loadingList" class="loading">Carregando...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <table v-else-if="tutores.length" class="tutores-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Contato</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tutor in tutores" :key="tutor.id">
              <td>{{ tutor.nome }}</td>
              <td>{{ tutor.contato || '-' }}</td>
              <td class="actions">
                <button @click="editTutor(tutor)" class="btn-edit">✏️</button>
                <button @click="deleteTutor(tutor.id)" class="btn-delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty">Nenhum tutor cadastrado</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { tutoresAPI, clinicasAPI } from '@/services/api'

/* eslint-disable @typescript-eslint/no-explicit-any */

const tutores = ref<any[]>([])
const loading = ref(false)
const loadingList = ref(false)
const error = ref<string | null>(null)
const editingId = ref<number | null>(null)
const clinicaId = ref<number | null>(null)

const form = ref({
  nome: '',
  telefone: '',
  email: '',
})

onMounted(async () => {
  // Buscar primeira clínica disponível (simplificação para demo)
  const clinicas = await clinicasAPI.list()
  if (clinicas.length > 0) {
    clinicaId.value = clinicas[0].id
  }
  await loadTutores()
})

async function loadTutores() {
  try {
    loadingList.value = true
    error.value = null
    tutores.value = await tutoresAPI.list(clinicaId.value || undefined)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao carregar tutores'
  } finally {
    loadingList.value = false
  }
}

async function handleSubmit() {
  try {
    loading.value = true
    error.value = null

    const data = {
      clinica_id: clinicaId.value,
      nome: form.value.nome,
      contato: buildContato(form.value.telefone, form.value.email),
    }

    if (editingId.value) {
      await tutoresAPI.update(editingId.value, data)
    } else {
      await tutoresAPI.create(data)
    }

    resetForm()
    await loadTutores()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao salvar tutor'
  } finally {
    loading.value = false
  }
}

function editTutor(tutor: any) {
  editingId.value = tutor.id
  form.value = {
    nome: tutor.nome,
    telefone: tutor.contato?.split(' - ')[0] || '',
    email: tutor.contato?.split(' - ')[1] || '',
  }
}

async function deleteTutor(id: number) {
  if (!confirm('Deseja realmente excluir este tutor?')) return

  try {
    await tutoresAPI.delete(id)
    await loadTutores()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao excluir tutor'
  }
}

function cancelEdit() {
  resetForm()
}

function resetForm() {
  editingId.value = null
  form.value = {
    nome: '',
    telefone: '',
    email: '',
  }
}

function buildContato(telefone?: string, email?: string) {
  const parts = [] as string[]
  if (telefone && telefone.trim()) parts.push(telefone.trim())
  if (email && email.trim()) parts.push(email.trim())
  return parts.length ? parts.join(' - ') : null
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f7fafc;
}

.page-header {
  background: white;
  padding: 20px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h1 {
  margin: 0;
  color: #2d3748;
}

.btn-back {
  padding: 8px 16px;
  background: #e2e8f0;
  color: #2d3748;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
}

.btn-back:hover {
  background: #cbd5e0;
}

.page-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  gap: 24px;
}

@media (min-width: 1600px) {
  .page-content {
    max-width: 90%;
  }
}

.form-card,
.list-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-card h2,
.list-card h2 {
  margin-top: 0;
  color: #2d3748;
  font-size: 20px;
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #32cd32;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn-primary {
  padding: 10px 24px;
  background: linear-gradient(135deg, #32cd32 0%, #006400 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  padding: 10px 24px;
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #cbd5e0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table thead {
  background: #f7fafc;
}

table th {
  padding: 12px;
  text-align: left;
  color: #4a5568;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
}

table td {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-edit {
  background: #bee3f8;
}

.btn-edit:hover {
  background: #90cdf4;
}

.btn-delete {
  background: #fed7d7;
}

.btn-delete:hover {
  background: #fc8181;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 20px;
  color: #718096;
}

.error {
  color: #e53e3e;
  background: #fff5f5;
  border-radius: 6px;
}

/* Responsividade */
@media (max-width: 768px) {
  .page-header {
    padding: 15px 20px;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .page-content {
    padding: 20px 15px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .tutores-table {
    font-size: 12px;
  }

  .tutores-table th,
  .tutores-table td {
    padding: 8px 6px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }

  .action-buttons button {
    width: 100%;
    padding: 6px 8px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .btn-back {
    padding: 6px 12px;
    font-size: 12px;
  }

  .tutores-table {
    font-size: 11px;
  }

  .form-card,
  .list-card {
    padding: 16px;
  }
}
</style>
