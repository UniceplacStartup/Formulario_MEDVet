<template>
  <div class="app">
    
    <div class="caixaLogin">
      <h1 class="titulo">Sistema MedVet</h1>
      <p class="subtitulo">Bem vindo(a)</p>
      
      <!-- caixa gmail e icone não colocado -->
      <form @submit.prevent="login">
        <div class="input-group">
          <span class="icon">#</span>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>

         <!-- caixa senha e icone não colocado -->
        <div class="input-group">
          <span class="icon">#</span>
          <input type="password" v-model="senha" placeholder="Senha" required />
        </div>

          <!-- botão entrar -->
        <button type="submit" class="btn-login"><Strong>Entrar</Strong></button>
      </form>
      
          <!-- Opções esqueci a senha e criar uma conta -->
      <div class="opcoes">
        <a href="#" class="esquecer"><Strong>Esqueci a senha</Strong></a>
        <a href="#" class="criar"><Strong>Criar uma conta</Strong></a>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      senha: '',
      loading: false,       
      errorMessage: '',     
      successMessage: ''    
    }
  },
  methods: {
    async login() {
      this.errorMessage = ''
      this.successMessage = ''
      this.loading = true

      const dados = { email: this.email, senha: this.senha }
      console.log('Dados prontos', dados)

      try {
        const resposta = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        })

        if (!resposta.ok) {
          let erroTexto = ''
          try {
            const erroJson = await resposta.json()
            erroTexto = erroJson.message || JSON.stringify(erroJson)
          } catch {
            erroTexto = await resposta.text()
          }
          this.errorMessage = 'Erro no login: ' + erroTexto
          console.error('Erro no login:', resposta.status, erroTexto)
          return
        }

        const resultado = await resposta.json()
        console.log('resposta do servidor: ', resultado)
        this.successMessage = 'Login realizado com sucesso!'
      } catch (err) {
        this.errorMessage = 'Erro de conexão com o servidor.'
        console.error('Falha na requisição (rede/CORS):', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .app{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f9fafb;
      margin: 0;
      font-family: Arial, sans-serif;
  }

  .caixaLogin{
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      width: 350px;
      text-align: center;
  }

  .titulo{
      font-size: 22px;
      font-weight: bold;
      background: linear-gradient(to right, #32cd32, #006400 ); 
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
  }

  .subtitulo{
      margin-bottom: 20px;
      color: #a0522d;
  }

  .input-group {
      display: flex;
      align-items: center;
      border: 1px solid #332f2fff;
      border-radius: 8px;
      margin-bottom: 15px;
      padding: 8px 10px;
      background: #fdfdfd;
    }

    .icon {
      margin-right: 8px;
    }

    .input-group input {
      border: none;
      outline: none;
      flex: 1;
    }

    .btn-login {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 8px;
      background: linear-gradient(to right, #32cd32, #006400);
      color: white;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }

    .opcoes {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }

    .esquecer {
      color: #a0522d;
      text-decoration: none;
    }

    .criar {
      color: #2e8b57;
      text-decoration: none;
    }

    
</style>
