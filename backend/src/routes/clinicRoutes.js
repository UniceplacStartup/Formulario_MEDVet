const { Router } = require('express');
const clinicController = require('../controllers/clinicController');

const router = Router();

// Rota para RF02: Cadastro da Clínica
router.post('/clinicas', clinicController.createClinic);

module.exports = router;
