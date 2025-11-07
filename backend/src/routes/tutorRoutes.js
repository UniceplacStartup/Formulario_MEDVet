
const { Router } = require('express');
const tutorController = require('../controllers/tutorController');

const router = Router();

// cadastro de tutor
router.post('/tutores', tutorController.createTutor);

module.exports = router;