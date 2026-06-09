const { Router } = require('express');
const controller = require('../controllers/formCalculationController');
const { authenticateToken } = require('../middlewares/auth');

const router = Router();

router.use(authenticateToken);

router.post('/calculos', controller.upsertFormCalculation); // upsert por formulario_id
router.get('/calculos/compute', controller.computeOnly); // calcula sem salvar
router.get('/calculos', controller.listFormCalculations);
router.get('/calculos/:id', controller.getFormCalculationById);
router.delete('/calculos/:id', controller.deleteFormCalculation);

module.exports = router;
