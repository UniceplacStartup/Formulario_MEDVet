const { Router } = require('express');
const UserController = require('../controllers/UserController');
const { authenticateToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/checkRole');

const router = Router();

router.post('/auth/register', authenticateToken, checkRole('admin'), UserController.register);
router.post('/auth/login', UserController.login);

module.exports = router;
