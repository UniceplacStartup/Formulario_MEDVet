const { Router } = require('express');
const controller = require('../controllers/consumedFoodController');
const { authenticateToken } = require('../middlewares/auth');

const router = Router();

router.use(authenticateToken);

router.post('/alimentos', controller.createConsumedFood);
router.get('/alimentos', controller.listConsumedFoods);
router.get('/alimentos/:id', controller.getConsumedFoodById);
router.put('/alimentos/:id', controller.updateConsumedFood);
router.delete('/alimentos/:id', controller.deleteConsumedFood);

module.exports = router;
