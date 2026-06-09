const { Router } = require('express');
const tutorController = require('../controllers/tutorController');
const { authenticateToken } = require('../middlewares/auth');

const router = Router();

router.use(authenticateToken);

router.post('/tutores', tutorController.createTutor);
router.get('/tutores', tutorController.listTutores);
router.get('/tutores/:id', tutorController.getTutorById);
router.put('/tutores/:id', tutorController.updateTutor);
router.delete('/tutores/:id', tutorController.deleteTutor);

module.exports = router;
