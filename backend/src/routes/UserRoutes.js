const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.post('/auth/register', UserController.register);
router.post('/auth/login', UserController.login);

module.exports = router;
