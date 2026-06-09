const { Router } = require('express');
const clinicController = require('../controllers/clinicController');
const { authenticateToken } = require('../middlewares/auth');

const router = Router();

// Rota para RF02: Cadastro da Clínica
router.post('/clinicas', clinicController.createClinic);

router.use(authenticateToken);

// Suporte à listagem de clínicas para o frontend
router.get('/clinicas', clinicController.listClinics);

module.exports = router;
