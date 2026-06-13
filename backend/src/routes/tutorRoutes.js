const { Router } = require('express');
const tutorController = require('../controllers/tutorController');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/checkRole');

const router = Router();

router.use(authenticateToken);

router.post('/tutores', checkRole('admin', 'veterinario'), tutorController.createTutor);
router.get('/tutores', checkRole('admin', 'veterinario', 'atendente'), tutorController.listTutores);
router.get('/tutores/:id', checkRole('admin', 'veterinario', 'atendente'), tutorController.getTutorById);
router.put('/tutores/:id', checkRole('admin', 'veterinario'), tutorController.updateTutor);
router.delete('/tutores/:id', checkRole('admin', 'veterinario'), tutorController.deleteTutor);

module.exports = router;
