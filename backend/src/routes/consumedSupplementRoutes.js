const { Router } = require('express');
const controller = require('../controllers/consumedSupplementController');

const router = Router();

router.post('/suplementos', controller.createConsumedSupplement);
router.get('/suplementos', controller.listConsumedSupplements);
router.get('/suplementos/:id', controller.getConsumedSupplementById);
router.put('/suplementos/:id', controller.updateConsumedSupplement);
router.delete('/suplementos/:id', controller.deleteConsumedSupplement);

module.exports = router;
