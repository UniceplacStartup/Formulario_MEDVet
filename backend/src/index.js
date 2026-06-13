require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if(!origin){
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback (new Error('Origem não permitida'));
    }
  })
);

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

const errorHandler = require('./middlewares/errorHandler');

app.use('/api', clinicRoutes); // RF02: Clínica
app.use('/api', UserRoutes);   // Auth
app.use('/api', tutorRoutes);  // Tutores CRUD
app.use('/api', patientRoutes);
app.use('/api', dietaryFormRoutes);
app.use('/api', consumedFoodRoutes);
app.use('/api', consumedSupplementRoutes);
app.use('/api', formCalculationRoutes);

// Middleware global de erro sempre por ultimo
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
