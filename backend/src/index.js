require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS para permitir requisições do frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware para o Express entender JSON
app.use(express.json());

// Rota "Health Check" para verificar se a API está no ar
app.get('/', (req, res) => {
  res.json({ message: 'API MedVet está funcionando!' });
});

// Importar e usar as rotas da aplicação
const clinicRoutes = require('./routes/clinicRoutes');
const UserRoutes = require('./routes/UserRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const dietaryFormRoutes = require('./routes/dietaryFormRoutes');
const consumedFoodRoutes = require('./routes/consumedFoodRoutes');
const consumedSupplementRoutes = require('./routes/consumedSupplementRoutes');
const formCalculationRoutes = require('./routes/formCalculationRoutes');

app.use('/api', clinicRoutes); // RF02: Clínica
app.use('/api', UserRoutes);   // Auth
app.use('/api', tutorRoutes);  // Tutores CRUD
app.use('/api', patientRoutes);
app.use('/api', dietaryFormRoutes);
app.use('/api', consumedFoodRoutes);
app.use('/api', consumedSupplementRoutes);
app.use('/api', formCalculationRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
