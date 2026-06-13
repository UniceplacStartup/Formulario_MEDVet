const { Router } = require('express');
const controller = require('../controllers/formCalculationController');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/checkRole');

const router = Router();

router.use(authenticateToken);

router.post('/calculos', checkRole('admin', 'veterinario'), controller.upsertFormCalculation); // upsert por formulario_id
router.get('/calculos/compute', checkRole('admin', 'veterinario', 'atendente'), controller.computeOnly); // calcula sem salvar
router.get('/calculos', checkRole('admin', 'veterinario', 'atendente'), controller.listFormCalculations);
router.get('/calculos/:id', checkRole('admin', 'veterinario', 'atendente'), controller.getFormCalculationById);
router.delete('/calculos/:id', checkRole('admin', 'veterinario'), controller.deleteFormCalculation);

module.exports = router;
