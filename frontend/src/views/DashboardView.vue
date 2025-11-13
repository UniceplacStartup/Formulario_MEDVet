<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>🏥 Sistema MedVet</h1>
      <button @click="handleLogout" class="btn-logout">Sair</button>
    </header>

    <div class="dashboard-content">
      <h2>Dashboard</h2>
      <p class="welcome">Bem-vindo ao sistema de gerenciamento veterinário!</p>

      <div class="cards-grid">
        <RouterLink to="/tutores" class="card">
          <div class="card-icon">👥</div>
          <h3>Tutores</h3>
          <p>Gerenciar responsáveis pelos pacientes</p>
        </RouterLink>

        <RouterLink to="/pacientes" class="card">
          <div class="card-icon">🐾</div>
          <h3>Pacientes</h3>
          <p>Gerenciar animais cadastrados</p>
        </RouterLink>

        <RouterLink to="/formularios" class="card card-highlight">
          <div class="card-icon">📋</div>
          <h3>Formulários Dietéticos</h3>
          <p>Criar e calcular dietas nutricionais</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.dashboard-header {
  background: white;
  padding: 20px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  margin: 0;
  color: #2d3748;
  font-size: 24px;
}

.btn-logout {
  padding: 8px 20px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-logout:hover {
  background: #c53030;
}

.dashboard-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

@media (min-width: 1600px) {
  .dashboard-content {
    max-width: 90%;
  }
}

.dashboard-content h2 {
  color: #2d3748;
  font-size: 32px;
  margin-bottom: 8px;
}

.welcome {
  color: #718096;
  font-size: 16px;
  margin-bottom: 40px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.card h3 {
  color: #2d3748;
  font-size: 20px;
  margin-bottom: 8px;
}

.card p {
  color: #718096;
  font-size: 14px;
  line-height: 1.5;
}

.card-highlight {
  background: linear-gradient(135deg, #32cd32 0%, #006400 100%);
  color: white;
}

.card-highlight h3,
.card-highlight p {
  color: white;
}

/* Responsividade */
@media (max-width: 768px) {
  .dashboard-header {
    padding: 15px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .dashboard-header h1 {
    font-size: 20px;
  }

  .dashboard-content {
    padding: 20px 15px;
  }

  .dashboard-content h2 {
    font-size: 24px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .card {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .dashboard-header h1 {
    font-size: 18px;
  }

  .btn-logout {
    width: 100%;
    padding: 10px;
  }
}
</style>

