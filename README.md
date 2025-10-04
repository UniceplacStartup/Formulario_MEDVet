# Sistema MedVet 🐾

![Badge de Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Badge de Licença](https://img.shields.io/badge/license-MIT-blue)

## 📄 Sobre o Projeto

O **Sistema MedVet** é uma aplicação web SaaS (Software as a Service) projetada para auxiliar clínicas veterinárias a realizar o registro e o acompanhamento do histórico dietético de seus pacientes. A plataforma permite o cadastro de clínicas, múltiplos usuários, o preenchimento de formulários detalhados e a geração de relatórios nutricionais.

Este repositório é um **monorepo**, contendo tanto o código do `backend` quanto do `frontend`.

## ✨ Funcionalidades Principais

- **Cadastro de Clínicas:** As clínicas podem se cadastrar no sistema de forma segura.
- **Gerenciamento de Usuários:** Cada clínica pode ter múltiplos usuários internos, como veterinários e atendentes.
- **Formulário Dietético Completo:** Preenchimento de um formulário detalhado com informações sobre alimentos, suplementos, frequência e quantidades da dieta do animal.
- **Cálculos Automatizados:** O sistema realiza o cálculo automático das necessidades nutricionais (EM, NEM) com base nos dados fornecidos.
- **Geração de Relatórios PDF:** Criação de um relatório profissional em PDF com todos os dados da consulta, pronto para ser entregue ao tutor do animal.
- **Histórico de Pacientes:** Acesso fácil a todos os relatórios e formulários anteriores de um animal, permitindo o acompanhamento de sua evolução.

## 🛠️ Stack Tecnológica

As tecnologias escolhidas para este projeto visam produtividade, escalabilidade e uma boa curva de aprendizado para a equipe.

| Parte | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend** | **Node.js com Express.js** | Criação da API RESTful de forma ágil e em JavaScript. |
| **Frontend** | **Vue.js (com Vite)** | Framework moderno e amigável para a construção de interfaces reativas. |
| **Banco de Dados** | **PostgreSQL** | Banco de dados relacional robusto e confiável para garantir a segurança das informações. |
| **Linguagem** | **JavaScript/TypeScript** | Uso de JavaScript em toda a stack para unificar o conhecimento, com TypeScript no frontend para maior segurança. |

## 🚀 Como Rodar o Projeto (Ambiente de Desenvolvimento)

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **NPM** ou **Yarn**
- **Git**
- Uma instância do **PostgreSQL** rodando

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/UniceplacStartup/Formul-rio_MEDVet.git](https://github.com/UniceplacStartup/Formul-rio_MEDVet.git)
    cd Formul-rio_MEDVet
    ```

2.  **Configure as Variáveis de Ambiente do Backend:**
    - Navegue até a pasta `backend`.
    - Crie uma cópia do arquivo `.env.example` (se houver) ou crie um novo arquivo chamado `.env`.
    - Preencha o arquivo `.env` com as suas credenciais do banco de dados:
      ```env
      # Configuração do Servidor
      PORT=3333

      # Configuração do Banco de Dados
      DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/SEU_BANCO"
      ```

3.  **Instale as dependências do Backend:**
    ```bash
    cd backend
    npm install
    ```

4.  **Instale as dependências do Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

### Executando a Aplicação

Você precisará de dois terminais abertos para rodar o backend e o frontend simultaneamente.

- **Terminal 1: Rodar o Backend**
  ```bash
  cd backend
  npm run dev
  ```
  O servidor do backend estará rodando em `http://localhost:3333`.

- **Terminal 2: Rodar o Frontend**
  ```bash
  cd frontend
  npm run dev
  ```
  A aplicação frontend estará acessível em `http://localhost:5173` (ou outra porta indicada no terminal).

## 🌳 Estrutura do Projeto

Este é um monorepo com a seguinte estrutura principal:

```
/
├── backend/      # Contém a aplicação Node.js/Express
├── frontend/     # Contém a aplicação Vue.js
├── .gitignore
└── README.md
```

## 🌿 Fluxo de Trabalho (Gitflow)

Adotamos um fluxo de trabalho baseado no Gitflow para manter o repositório organizado:

- `main`: Contém o código em produção. Estável.
- `develop`: Branch de integração. Contém as últimas funcionalidades desenvolvidas.
- `feature/...`: Todas as novas funcionalidades ou correções são feitas em branches de feature que partem da `develop`. O trabalho é integrado de volta à `develop` através de **Pull Requests (PRs)**.

## ⚖️ Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
