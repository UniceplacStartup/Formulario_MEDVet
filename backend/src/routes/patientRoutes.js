const { Router } = require('express');
const patientController = require('../controllers/patientController');

const router = Router();

router.post('/pacientes', patientController.createPatient);
router.get('/pacientes', patientController.listPatients);
router.get('/pacientes/:id', patientController.getPatientById);
router.put('/pacientes/:id', patientController.updatePatient);
router.delete('/pacientes/:id', patientController.deletePatient);

module.exports = router;
