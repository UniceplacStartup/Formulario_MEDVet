<template>
  <div class="app">
    <div class="caixa-formulario">
      <h1 class="titulo">Sistema MedVet</h1>
      <p class="subtitulo">Crie sua conta para acessar o sistema</p>

      <form @submit.prevent="cadastrar">
        <div class="input-group">
          <span class="icon">👤</span>
          <input type="text" v-model="nome" placeholder="Nome Completo" required />
        </div>

        <div class="input-group">
          <span class="icon">✉️</span>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>

        <div class="input-group">
          <span class="icon">🔒</span>
          <input type="password" v-model="senha" placeholder="Senha" required />
        </div>

        <div class="input-group">
          <span class="icon">🔒</span>
          <input type="password" v-model="confirmarSenha" placeholder="Confirmar Senha" required />
        </div>

        <div v-if="errorMessage" class="mensagem-erro">{{ errorMessage }}</div>
        <div v-if="successMessage" class="mensagem-sucesso">{{ successMessage }}</div>

        <button type="submit" class="btn-acao" :disabled="loading">
          <strong v-if="!loading">Cadastrar</strong>
          <strong v-else>Cadastrando...</strong>
        </button>
      </form>

      <div class="opcoes">
        <a href="#" class="link-login"><strong>Já tenho uma conta</strong></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      loading: false,
      errorMessage: '',
      successMessage: '',
    }
  },
  methods: {
    async cadastrar() {
      this.errorMessage = ''
      this.successMessage = ''

      if (this.senha !== this.confirmarSenha) {
        this.errorMessage = 'As senhas não coincidem.'
        return
      }

      this.loading = true

      const dados = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
      }

      try {
        const resposta = await fetch('http://localhost:8080/api/cadastro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        })

        const resultado = await resposta.json()

        if (!resposta.ok) {
          this.errorMessage = resultado.message || 'Ocorreu um erro no cadastro.'
        } else {
          this.successMessage = resultado.message || 'Cadastro realizado com sucesso!'
          this.limparFormulario()
        }
      } catch (err) {
        this.errorMessage = 'Não foi possível conectar ao servidor. Tente mais tarde.'
        console.error('Falha na requisição:', err)
      } finally {
        this.loading = false
      }
    },
    limparFormulario() {
      this.nome = ''
      this.email = ''
      this.senha = ''
      this.confirmarSenha = ''
    },
  },
}
</script>

<style>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
  margin: 0;
  font-family: Arial, sans-serif;
}

.caixa-formulario {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 380px;
  text-align: center;
}

.titulo {
  font-size: 22px;
  font-weight: bold;
  background: linear-gradient(to right, #32cd32, #006400);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitulo {
  margin-bottom: 25px;
  color: #a0522d;
}

.input-group {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 10px 12px;
  background: #fdfdfd;
  transition: border-color 0.3s ease;
}

.input-group:focus-within {
  border-color: #006400;
}

.icon {
  margin-right: 10px;
  color: #888;
}

.input-group input {
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 14px;
}

.btn-acao {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(to right, #32cd32, #006400);
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: opacity 0.3s ease;
}

.btn-acao:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.opcoes {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-size: 14px;
}

.link-login {
  color: #2e8b57;
  text-decoration: none;
}

.mensagem-erro {
  color: #d8000c;
  background-color: #ffd2d2;
  border: 1px solid #d8000c;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: left;
}

.mensagem-sucesso {
  color: #4f8a10;
  background-color: #dff2bf;
  border: 1px solid #4f8a10;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: left;
}
</style>
