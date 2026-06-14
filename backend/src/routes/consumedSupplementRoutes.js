const { Router } = require('express');
const controller = require('../controllers/consumedSupplementController');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/checkRole');

const router = Router();

router.use(authenticateToken);

router.post('/suplementos', checkRole('admin', 'veterinario'), controller.createConsumedSupplement);
router.get('/suplementos', checkRole('admin', 'veterinario', 'atendente'), controller.listConsumedSupplements);
router.get('/suplementos/:id', checkRole('admin', 'veterinario', 'atendente'), controller.getConsumedSupplementById);
router.put('/suplementos/:id', checkRole('admin', 'veterinario'), controller.updateConsumedSupplement);
router.delete('/suplementos/:id', checkRole('admin', 'veterinario'), controller.deleteConsumedSupplement);

module.exports = router;
