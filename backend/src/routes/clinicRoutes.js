const { Router } = require('express');
const clinicController = require('../controllers/clinicController');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/checkRole');

const router = Router();

router.use(authenticateToken);

// Rota para RF02: Cadastro da Clínica
router.post('/clinicas', checkRole('admin'), clinicController.createClinic);

// Suporte à listagem de clínicas para o frontend
router.get('/clinicas', checkRole('admin', 'veterinario', 'atendente'), clinicController.listClinics);

module.exports = router;
