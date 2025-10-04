require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para o Express entender JSON
app.use(express.json());

// Rota "Health Check" para verificar se a API está no ar
app.get('/', (req, res) => {
  res.json({ message: 'API MedVet está funcionando!' });
});

// TODO: Importar e usar as rotas da aplicação aqui
// Ex: const clinicRoutes = require('./routes/clinicRoutes');
// app.use('/api', clinicRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Middleware para o Express entender JSON
app.use(express.json());

// Rota "Health Check"
app.get('/', (req, res) => {
  res.json({ message: 'API MedVet está funcionando!' });
});

// Importar e usar as rotas da aplicação
const clinicRoutes = require('./routes/clinicRoutes');
app.use('/api', clinicRoutes); // Todas as rotas de clínica começarão com /api

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
});