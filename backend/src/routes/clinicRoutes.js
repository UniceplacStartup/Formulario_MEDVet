const { Router } = require('express');
const clinicController = require('../controllers/clinicController');

const router = Router();

// Rota para RF02: Cadastro da Clínica
router.post('/clinicas', clinicController.createClinic);
// Suporte à listagem de clínicas para o frontend
router.get('/clinicas', clinicController.listClinics);

module.exports = router;
