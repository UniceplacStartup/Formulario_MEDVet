const { Router } = require('express');
const controller = require('../controllers/consumedSupplementController');
const { authenticateToken } = require('../middlewares/auth');

const router = Router();

router.use(authenticateToken);

router.post('/suplementos', controller.createConsumedSupplement);
router.get('/suplementos', controller.listConsumedSupplements);
router.get('/suplementos/:id', controller.getConsumedSupplementById);
router.put('/suplementos/:id', controller.updateConsumedSupplement);
router.delete('/suplementos/:id', controller.deleteConsumedSupplement);

module.exports = router;
