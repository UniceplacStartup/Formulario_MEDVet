const { Router } = require('express');
const controller = require('../controllers/dietaryFormController');
const { authenticateToken } = require('../middlewares/auth');

const router = Router();

router.use(authenticateToken);

router.post('/formularios', controller.createDietaryForm);
router.get('/formularios', controller.listDietaryForms);
router.get('/formularios/:id', controller.getDietaryFormById);
router.put('/formularios/:id', controller.updateDietaryForm);
router.delete('/formularios/:id', controller.deleteDietaryForm);

module.exports = router;
