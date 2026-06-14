# 🐾 Sistema MedVet - Versão Demo

Sistema de gerenciamento veterinário com foco em formulários dietéticos e cálculos nutricionais.

## 🚀 Como Rodar a Demo

### 1. Backend

```powershell
cd backend
npm install
npm run db:migrate   # Aplicar migrations
npm start           # Iniciar servidor na porta 3000
```

### 2. Dados de Demonstração

Execute o script SQL para criar dados iniciais:

```sql
psql -U postgres -d medvet -f backend/seed-demo.sql
```

Ou crie manualmente via Postman usando a collection `backend/MedVet_API.postman_collection.json`.

**Credenciais de teste:**
- Email: `admin@demo.com`
- Senha: `Demo1234`

### 3. Frontend

```powershell
cd frontend
npm install
npm run dev        # Iniciar em http://localhost:5173
```

## 📋 Fluxo de Demonstração

1. **Login** (http://localhost:5173)
   - Use as credenciais: `admin@demo.com` / `Demo1234`

2. **Dashboard**
   - Navegue pelos cards para acessar as funcionalidades

3. **Tutores**
   - Cadastre um tutor (responsável pelo animal)

4. **Pacientes**
   - Cadastre um paciente vinculado a um tutor
   - Informe espécie (cão/gato), peso, etc.

5. **Formulários Dietéticos** ⭐ (CORE DA DEMO)
   - Selecione um paciente
   - Adicione alimentos consumidos com composição nutricional
   - Clique em **"Calcular Dieta"**
   - Sistema calcula automaticamente:
     - **EM**: Energia Metabolizável (kcal/dia)
     - **NEM**: Necessidade Energética de Manutenção (kcal/dia)
     - **Quantidade Recomendada**: Gramas de ração/dia

## 🛠️ Tecnologias

### Backend
- Node.js + Express
- PostgreSQL (via node-postgres)
- JWT para autenticação
- Bcrypt para senhas

### Frontend
- Vue 3 + TypeScript
- Pinia (state management)
- Vue Router
- CSS puro

## 📊 Endpoints Principais

- `POST /api/usuarios/login` - Autenticação
- `GET/POST /api/tutores` - CRUD Tutores
- `GET/POST /api/pacientes` - CRUD Pacientes
- `GET/POST /api/formularios` - CRUD Formulários
- `POST /api/alimentos` - Adicionar alimentos consumidos
- `POST /api/calculos` - Calcular/salvar dieta (com `auto: true`)
- `GET /api/calculos/compute?formulario_id=X` - Calcular sem salvar

## 🧮 Lógica de Cálculo

O sistema usa:
- **Fatores de Atwater modificados**: Proteína (3.5 kcal/g), Gordura (8.5 kcal/g), NFE (3.5 kcal/g)
- **RER (Requerimento Energético em Repouso)**: 70 × peso^0.75
- **NEM**: RER × fator de manutenção (1.6 para cães, 1.2 para gatos)
- **Densidade Energética**: EM total / gramas totais
- **Quantidade Recomendada**: NEM / densidade energética

## 📁 Estrutura

```
backend/
  ├── src/
  │   ├── controllers/    # Lógica de negócio
  │   ├── routes/         # Rotas da API
  │   ├── models/         # Modelos de dados
  │   └── services/       # calculationService.js
  ├── migrations/         # Migrations do Sequelize
  └── MedVet_API.postman_collection.json

frontend/
  ├── src/
  │   ├── views/          # Páginas principais
  │   ├── components/     # Componentes Vue
  │   ├── stores/         # Pinia stores
  │   └── services/       # api.ts (client HTTP)
  └── package.json
```

## ✅ Checklist de Apresentação

- [ ] Backend rodando (porta 3000)
- [ ] Frontend rodando (porta 5173)
- [ ] Dados de demo criados no banco
- [ ] Login funcionando
- [ ] Fluxo completo testado:
  - [ ] Criar tutor
  - [ ] Criar paciente
  - [ ] Criar formulário dietético
  - [ ] Adicionar alimentos
  - [ ] **Calcular dieta e exibir resultados**

## 🎯 Objetivo da Demo

Demonstrar que o sistema é capaz de:
1. Gerenciar dados básicos (tutores, pacientes)
2. Coletar informações nutricionais (alimentos consumidos)
3. **Calcular automaticamente as necessidades dietéticas** baseado em dados reais
4. Apresentar recomendações claras aos veterinários

---

**Desenvolvido para apresentação aos stakeholders - Versão de Demonstração**
