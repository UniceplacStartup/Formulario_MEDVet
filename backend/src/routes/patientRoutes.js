const { Router } = require('express');
const patientController = require('../controllers/patientController');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/checkRole');

const router = Router();

router.use(authenticateToken);

router.post('/pacientes', checkRole('admin', 'veterinario'), patientController.createPatient);
router.get('/pacientes', checkRole('admin', 'veterinario', 'atendente'), patientController.listPatients);
router.get('/pacientes/:id', checkRole('admin', 'veterinario', 'atendente'), patientController.getPatientById);
router.put('/pacientes/:id', checkRole('admin', 'veterinario'), patientController.updatePatient);
router.delete('/pacientes/:id', checkRole('admin', 'veterinario'), patientController.deletePatient);

module.exports = router;
